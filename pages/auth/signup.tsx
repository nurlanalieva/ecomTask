import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signupUser } from "../../store/actions/auth";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";

export interface IErrorMessages {
  firstname: "";
  lastname: "";
  email: "";
  password: "";
}
const theme = createTheme();
const SignUp = (props) => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const router = useRouter();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user, props);
    props
      .dispatchSignupUser(user)
      .then(() => router.push("/auth/signin"))
      .catch((error) => setError(error));
  };
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstname"
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  defaultValue={user.firstname}
                  // helperText={error.errorMessage.firstname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  onChange={handleChange}
                  defaultValue={user.lastname}
                  // helperText={error.errorMessage.lastname?}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  defaultValue={user.email}
                  // helperText={error.errorMessage.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  defaultValue={user.password}
                  // helperText={error.errorMessage.password}
                />
              </Grid>
            </Grid>
            {error ? (
              <Alert sx={{ mt: 5 }} severity="error">
                {error}
              </Alert>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/signin">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignupUser: (credentials) => dispatch(signupUser(credentials)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
SignUp.propTypes = {
  dispatchSignupUser: PropTypes.func.isRequired,
};
