import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  TextField,
  Button,
  Avatar,
  Box,
  Alert,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { deepPurple } from "@mui/material/colors";
import { connect } from "react-redux";
import { checkAuth, logoutUser } from "../../store/actions/auth";
import { useEditUser } from "../../services/editUser";
import { useGetUser } from "../../services/user";
import { IUser } from "../../interfaces/IUser";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useRouter } from "next/router";

const userProfile = (props) => {
  const { user } = useGetUser(props.currentUser.id);
  const [error, setError] = useState("");
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<IUser>({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setCurrentUser(user as IUser);
  }, [user]);


  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const editUser = () => {
     useEditUser(currentUser.id, currentUser, setError);
  };

  const logout = () => {
    props.dispatchLogoutUser().then(() => router.push("/auth/signin"));
  };
  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 1,
            m: 1,
          }}
        >
          <Grid item xs={12}>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>N</Avatar>
          </Grid>
        </Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          spacing={2}
        >
          <Grid item xs={4}>
            <TextField
              required
              id="firstname"
              label="Firstname"
              // defaultValue={currentUser?.firstname}
              name="firstname"
              onChange={handleChange}
              value={currentUser?.firstname}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="lastname"
              label="Lastname"
              // defaultValue={currentUser?.lastname}
              value={currentUser?.lastname}
              name="lastname"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="email"
              label="Email"
              // defaultValue={currentUser?.email}
              value={currentUser?.email}
              onChange={handleChange}
              name="email"
            />
          </Grid>
          <Grid sx={{ pt: 1 }} item xs={12}>
            {error.includes("Email") ? (
              <Alert sx={{ mt: 3, mb: 3 }} severity="error">
                {error}
              </Alert>
            ) : error === "User info updated" ? (
              <Alert sx={{ mt: 3, mb: 3 }} severity="success">
                User info updated
              </Alert>
            ) : null}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 1,
                m: 1,
              }}
            >
              <Button
                variant="outlined"
                size="large"
                color="error"
                sx={{ mr: 3 }}
                onClick={logout}
                startIcon={<LogoutOutlinedIcon />}
              >
                Logout
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={editUser}
                startIcon={<EditOutlinedIcon />}
              >
                Edit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = ({ auth: { authChecked, loggedIn, currentUser } }) => {
  return { authChecked, loggedIn, currentUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCheckAuth: () => dispatch(checkAuth()),
    dispatchLogoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(userProfile);
