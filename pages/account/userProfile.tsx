import React from "react";
import { Grid, Container, TextField, Button, Avatar, Box } from "@mui/material";
 import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { deepPurple } from "@mui/material/colors";

const userProfile = () => {
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
              id="name"
              label="Name"
              defaultValue="Hello World"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="surname"
              label="Surname"
              defaultValue="Hello World"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="email"
              label="Email"
              defaultValue="Hello World"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="password"
              label="Password"
              defaultValue="Hello World"
            />
          </Grid>
          <Grid sx={{ pt: 1 }} item xs={12}>
            <Button
              variant="outlined"
              size="large"
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
export default userProfile;
