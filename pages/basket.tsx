import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useGetProducts } from "../services/products";

const Basket = () => {
  const { products, loading, error } = useGetProducts();
  const [productsId, setProductsId] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  // console.log(products, loading, error);

  useEffect(() => {
    let cartProductIds = [];
    cartProductIds = JSON.parse(localStorage.getItem("cartProductIds"));
    console.log(cartProductIds);
    // setProductsId(JSON.parse(localStorage.getItem("cartProductIds")))

    const filterByReference = (productsProps, cartProductIdsProps) => {
      let res = [];
      res = productsProps.filter((el) => {
        return cartProductIdsProps?.find((element) => {
          return element === el.id;
        });
      });
      return res;
    };
    setFilteredProducts(filterByReference(products, cartProductIds));
  }, [products]);
  useEffect(() => {
    console.log(filteredProducts);
  }, [filteredProducts]);

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          spacing={2}
        >
          <Grid item xs={12}>
          {filteredProducts.map((cardProduct) => (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image="./images/static.jpg"
                  alt="Product Image"
                />
                <ListItemText
                  sx={{ pl: 2 }}
                  primary={cardProduct?.price +'AZN'}
                  secondary={
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                     {cardProduct?.name}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          ))}
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
            m: 1,
          }}
        >
          <Button variant="outlined">Checkout</Button>
        </Box>
      </Container>
    </>
  );
};
export default Basket;
