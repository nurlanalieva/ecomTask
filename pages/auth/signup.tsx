import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
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
import PropTypes from 'prop-types';

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
  const [error, setError] = useState({
    status: false,
    errorMessage: {
      // firstname: "",
      // lastname: "",
      // email: "",
      // password: "",
    },
  });
  const router = useRouter();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user, props);
    let isError = false;
    if (user.firstname === "") {
      isError = true;
      setError({
        status: true,
        errorMessage: {
          firstname: "Firstname  is reguired",
          lastname: "Firstname  is reguired",
          email: "Firstname  is reguired",
          password: "Firstname  is reguired",
        },
      });
    }
    if (user.lastname === "") {
      isError = true;
      setError((prev) => ({
        ...prev,
        status: true,
        errorMessage: {
          ...prev.errorMessage,
          lastname: "Lastname  is reguired",
        },
      }));
    }
    // if (user.email === "") {
    //   isError = true;
    //   setError((prev) => ({
    //     ...prev,
    //     status: true,
    //     errorMessage: {
    //       ...prev.errorMessage,
    //       email: "Email is reguired",
    //     },
    //   }));
    // }
    console.log(/^[A-Za-z0-9+_.-]+@(.+)$/.test(user.email));

    if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(user.email)) {
      isError = true;
      setError((prev) => ({
        ...prev,
        status: true,
        errorMessage: {
          ...prev.errorMessage,
          email: "Please enter correct email",
        },
      }));
    }
    if (user.password === "") {
      isError = true;
      setError((prev) => ({
        ...prev,
        status: true,
        errorMessage: {
          ...prev.errorMessage,
          password: "Password is reguired",
        },
      }));
    }
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{6,16}$/.test(
        user.password
      )
    ) {
      isError = true;
      setError((prev) => ({
        ...prev,
        status: true,
        errorMessage: {
          ...prev.errorMessage,
          password: "Please enter correct password",
        },
      }));
    }
    if (!isError) {
      setError((prev) => ({
        ...prev,
        status: false,
        errorMessage: {
          // firstname: "",
          // lastname: "",
          // email: "",
          // password: "",
        },
      }));
      props
        .dispatchSignupUser(user)
        .then(() => router.push("/auth/signin"))
        .catch((error) => setError(error));
    }
    // if (!error.status) {
    //   props
    //     .dispatchSignupUser(user)
    //     .then(() => router.push("/auth/signin"))
    //     .catch((error) => setError(error));
    // }
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
                <Link href="/auth/signin" variant="body2">
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