import React, { useState, useEffect } from "react";
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
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { getProducts, useGetProducts } from "../../services/products";
import { useEditProduct } from "../../services/editProduct";

export default function Products() {
  const { products } = useGetProducts();
  const [open, setOpen] = useState(false);
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
    setEditItem(product);
  };

  const editProduct = () => {
    console.log(editItem);
    const { data } = useEditProduct(editItem.id, editItem);
    console.log(data);
    getProducts()
    handleClose();
  };

  const handleChange = (e) => {
    console.log(e.target, e.target.value);
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    //  getProducts()
  }, [products]);

  const handleClose = () => {
    getProducts()
    setOpen(false);
  };
  const addimage = (e) => {
    console.log(e);
    
    // console.log(e.srcElement.files);
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
          <Link href="/admin/addProduct" underline="none">
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
                <TableCell align="right">
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
                  id="contained-button-file"
                  type="file"
                  accept="image/*"
                  // value={editItem?.base64}
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
    </Container>
  );
}
