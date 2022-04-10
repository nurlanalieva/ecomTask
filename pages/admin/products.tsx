import React, { useState } from "react";
import {
  Container,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useGetProducts } from "../../services/products";
import { useEditProduct } from "../../services/editProduct";
import axios from "axios";
import { domainUrl } from "../../config/baseUrl";
import Link from 'next/link';

export default function Products() {
  const [open, setOpen] = useState(false);
  const [retry, setRetry] = useState(false);
  const { products } = useGetProducts(retry);
  const [error, setError] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [picture, setPicture] = useState({ base64: "", name: "" });

  const [editItem, setEditItem] = useState({
    base64: "",
    stock: 0,
    id: 0,
    name: "",
    price: "",
    sale: 0,
  });

  const handleClickOpen = (e, product) => {
    setOpen(true);
    setRetry(!retry);
    setEditItem(product);
  };

  const editProduct = () => {
    console.log(editItem);
    
    editItem.base64 = picture.base64;
    const { data } = useEditProduct(editItem.id, editItem);
    console.log(data);
    handleClose();
  };

  const handleChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setRetry(!retry);
    setOpen(false);
  };

  const deleteProduct = (e, id) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: `${domainUrl}/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        setError(false);
        setRetry(!retry);
      })
      .catch(() => {
        setError(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackOpen(true);
  };

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

  return (
    <Container sx={{ pt: 4, mb: 10 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pb: 2,
        }}
      >
        <Button variant="outlined">
          <Link href="/admin/addProduct">
            Add New Product
          </Link>
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell
                  align="right"
                  onClick={(e) => handleClickOpen(e, item)}
                >
                  <EditOutlinedIcon />
                </TableCell>
                <TableCell
                  align="right"
                  onClick={(e) => deleteProduct(e, item.id)}
                >
                  <DeleteOutlinedIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Product"}</DialogTitle>
        <DialogContent>
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              spacing={2}
            >
              <Grid item xs={6}>
                <TextField
                  required
                  id="name"
                  label="name"
                  defaultValue={editItem?.name}
                  onChange={handleChange}
                  name="name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="price"
                  label="Price"
                  defaultValue={editItem?.price}
                  onChange={handleChange}
                  name="price"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="sale"
                  label="sale"
                  defaultValue={editItem?.sale}
                  onChange={handleChange}
                  name="sale"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="stock"
                  label="stock"
                  defaultValue={editItem?.stock}
                  onChange={handleChange}
                  name="stock"
                />
              </Grid>
              <Grid item xs={6}>
                <input
                  style={{ display: "none", width: "100%" }}
                  id="productImg"
                  type="file"
                  accept="image/*"
                  onChange={addimage}
                  name="image"
                  // value={editItem.base64}
                />
                <label htmlFor="productImg">
                  <Button
                    sx={{ width: "100%", height: "58px" }}
                    variant="outlined"
                    color="primary"
                    component="span"
                  >
                    {picture.name ? picture.name : "UPLOAD"}
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
                <Grid item xs={6}>
                  <Button
                    sx={{ width: "100%", height: "58px" }}
                    variant="outlined"
                    color="primary"
                    component="span"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editProduct} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Please try again
          </Alert>
        ) : (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Success
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
}
