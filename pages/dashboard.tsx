import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import utilStyles from "../styles/utils.module.css";
import { useGetProducts } from "../services/products";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Dashboard() {
  const { products, loading, error } = useGetProducts();
  const [productsId, setProductsId] = useState([]);
 
  const addProductLocalStorage = () => {
    // localStorage.setItem("cartProducts", product);
  };
  const addProductToCart = (e, product) => {
    console.log(product);
    // 
    if (!productsId.includes(product.id)) {
      setProductsId([...productsId, product.id]);
    }
    localStorage.setItem("cartProductIds", JSON.stringify(productsId));
    // localStorage.getItem('testObject')   JSON.parse(retrievedObject)
  };


  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 30,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <main>
          <Container sx={{ py: 8 }} maxWidth="xl">
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item key={product?.id} xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      className={utilStyles.cardMedia}
                      component="img"
                      image="https://source.unsplash.com/random"
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h5">
                        <span className={utilStyles.salePrice}>
                          {product?.price} AZN
                        </span>
                        <span>
                          {(product?.price * product?.sale) / 100} AZN{" "}
                        </span>
                      </Typography>
                      <Typography>Sale : {product?.sale}% </Typography>
                      <Typography>{product?.name}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        className={utilStyles.btnCenter}
                        onClick={(e) => addProductToCart(e, product)}
                      >
                        Add Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      )}
    </>
  );
}

export default Dashboard;
