import { useEffect, useState } from "react";
import { httpHelper } from "../pages/helpers/httpHelper";
import axios from "axios";
import { domainUrl } from "../config/baseUrl";
interface IProduct {
  id: number;
  name: string;
  base64: string;
  price: number;
  stock: number;
  sale: number;
  userId: number;
}

export const useGetProducts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function getProduct() {
      const res = axios({
        method: "get",
        url: domainUrl,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    }
    getProduct();
  }, []);
  return {
    products,
    loading,
    error,
  };
};

export const getProducts = () => {
    const res = axios({
      method: "get",
      url: domainUrl,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        res.data;
        false;
      })
      .catch((err) => {
        console.log(err);
      });
      return res
};
