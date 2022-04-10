import React, { useEffect, useState } from "react";
import { Grid, Container, TextField, Button, Avatar, Box, Alert } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { deepPurple } from "@mui/material/colors";
import { connect } from "react-redux";
import { checkAuth } from "../../store/actions/auth";
import { useEditUser } from "../../services/editUser";
import { useGetUser } from "../../services/user";
import { IUser } from "../../interfaces/IUser";

const userProfile = (props) => {
  const { user } = useGetUser(props.currentUser.id);
  // const [userId] = useState(props.currentUser.id);
  // const [currentUser, setCurrentUser] = useState<IUser>();
const [error, setError] = useState('')
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setCurrentUser( user  as IUser);
    }
    console.log(user);

    // setCurrentUser({
    //   id: user.id,
    //   firstname: user.firstname,
    //   lastname: user.lastname,
    //   email: user.email,
    //   password: user.password,
    // });
    console.log(typeof user?.id);
    // console.log(userId);
  }, [user]);


  useEffect(() => {
    console.log(currentUser);
  }, [user,currentUser]);


  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const editUser = () => {
    // setCurrentUser(user)
    console.log(currentUser);
    const { data } = useEditUser(currentUser.id, currentUser,setError);
    console.log(data);
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
              defaultValue={currentUser.firstname}
              name="firstname"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="lastname"
              label="Lastname"
              defaultValue={currentUser.lastname}
              name="lastname"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="email"
              label="Email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              name="email"
            />
          </Grid>
          <Grid sx={{ pt: 1 }} item xs={12}>
          {error ? (
              <Alert sx={{ mt: 3,mb:3 }} severity="error">
                {error}
              </Alert>
            ) : null}
            <Button
              variant="outlined"
              size="large"
              onClick={editUser}
              startIcon={<EditOutlinedIcon />}
            >
              Edit
            </Button>
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
  };
};

// return connect(mapStateToProps, mapDispatchToProps)(userProfile);
export default connect(mapStateToProps, mapDispatchToProps)(userProfile);

// export default userProfile;
