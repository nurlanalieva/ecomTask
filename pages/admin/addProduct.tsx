import React, { useState } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import { domainUrl } from "../../config/baseUrl";
import { useRouter } from "next/router";

export default function AddProduct() {
  const [error, setError] = useState(false);
  const [picture, setPicture] = useState({ base64: "" ,name:""});
  // const [base64URL, setBase64URL] = useState("")
  const router = useRouter();

  const [product, setProduct] = useState({
    name: "",
    base64: "",
    price: "",
    stock: 0,
    sale: 0,
    // userId: 1
  });
  const addimage = (e) => {
    console.log(error);
    const file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        // setBase64URL(file["base64"])
        setPicture(file);
      })
      .catch((err) => {
        console.log(err);
      });
    setPicture(e.target.files[0]);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const addProduct = (event) => {
    event.preventDefault();
    product.base64 = picture.base64;
    axios({
      method: "post",
      url: domainUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: product,
    })
      .then((res) => {
        console.log(res.data);
        router.push("/admin/products");
      })
      .catch(() => {
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
              name="image"
              onChange={addimage}
              value={product.base64}
            />
            <label htmlFor="contained-button-file">
              <Button
                sx={{ width: "100%", height: "58px" }}
                variant="outlined"
                color="primary"
                component="span"
              >
                {picture.name?picture.name:"UPLOAD"}
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
