import React, { useState } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import { domainUrl } from "../../config/baseUrl";

export default function AddProduct() {
  const [error, setError] = useState(false);
  const [picture, setPicture] = useState({})
  const [product, setProduct] = useState({
    // id: id+2,
    name: "",
    base64: "",
    price: "",
    stock: 0,
    sale: 0,
    // userId: 1
  });
  const addimage = (e) => {
    console.log(picture,error);
    
    // console.log(e.srcElement.files);
    setPicture({
      /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0]
    });
  };

  const addProduct = (event) => {
    event.preventDefault();
    console.log(product);

     axios({
      method: "post",
      url: domainUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data:product
    })
      .then((res) => {
        console.log(res.data.id);
        // setId(res.data.id)
        // setProducts(res.data);
        // setLoading(false);
      })
      .catch(() => {
        // setLoading(false);
        setError(true);
      });
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            spacing={2}
          >
            <Grid item xs={4}>
              <TextField
                required
                name="name"
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={handleChange}
                defaultValue={product.name}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                name="price"
                fullWidth
                id="price"
                label="Price"
                autoFocus
                onChange={handleChange}
                defaultValue={product.price}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                name="sale"
                fullWidth
                id="sale"
                label="Sale"
                autoFocus
                onChange={handleChange}
                defaultValue={product.sale}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                name="stock"
                fullWidth
                id="stock"
                label="Stock"
                autoFocus
                onChange={handleChange}
                defaultValue={product.stock}
              />
            </Grid>
            <Grid item xs={4}>
              <input
                style={{ display: "none", width: "100%" }}
                id="contained-button-file"
                type="file"
                accept="image/*"
                onChange={addimage}
                name="image"
              />
              <label htmlFor="contained-button-file">
                <Button
                  sx={{ width: "100%", height: "58px" }}
                  variant="outlined"
                  color="primary"
                  component="span"
                >
                  Upload
                </Button>
              </label>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              pt: 1,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Button
                  sx={{ width: "100%", height: "58px" }}
                  variant="outlined"
                  color="primary"
                  component="span"
                  onClick={addProduct}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
      </Container>
    </>
  );
}
