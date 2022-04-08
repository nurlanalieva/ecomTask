import { useEffect, useState } from "react";
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

export const useGetProduct = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const url = `${domainUrl}/${id}`;
    const res = axios({
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, []);
  return {
    product,
    loading,
    error,
  };
};
