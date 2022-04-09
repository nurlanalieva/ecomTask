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
import utilStyles from "../styles/utils.module.css";

const Basket = () => {
  const [retry, setRetry] = useState(false);
  const { products } = useGetProducts(retry);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let cartProductIds = [];
    setRetry(!retry);
    cartProductIds = JSON.parse(localStorage.getItem("cartProductIds"));
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


  const getEmptyBasket = () => {
    localStorage.removeItem("cartProductIds");
    setFilteredProducts([]);
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
          <Grid item xs={12}>
            {filteredProducts.map((cardProduct) => (
              <List
                key={cardProduct.id}
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={cardProduct.base64}
                    alt="Product Image"
                  />
                  <ListItemText
                    sx={{ pl: 2 }}
                    primary={
                      cardProduct?.sale ? (
                        <div className={utilStyles.salePrice}>
                          {cardProduct?.price + "AZN"}
                        </div>
                      ) : (
                        cardProduct?.price + "AZN"
                      )
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {cardProduct?.sale
                            ? (cardProduct?.price * (100 - cardProduct?.sale)) /
                                100 +
                              "AZN"
                            : null}
                        </Typography>
                        <Typography
                          sx={{ display: "block" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {cardProduct?.name}
                        </Typography>
                        <Typography
                          sx={{ display: "block" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Sale: {cardProduct?.sale}
                        </Typography>
                        <Typography
                          sx={{ display: "block" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Amount to be paid:
                          {(cardProduct?.price * (100 - cardProduct?.sale)) /
                            100}
                          AZN
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </List>
            ))}
          </Grid>
        </Grid>
        {filteredProducts.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
              m: 1,
            }}
          >
            <Button
              sx={{ mr: 3 }}
              onClick={getEmptyBasket}
              variant="outlined"
              color="error"
            >
              Empty the basket
            </Button>
            <Button variant="outlined">Checkout</Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              m: 1,
              mt: 20,
            }}
          >
            Basket is empty. Please add products!!!
          </Box>
        )}
      </Container>
    </>
  );
};
export default Basket;
