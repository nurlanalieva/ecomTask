import { useEffect, useState } from "react";
import axios from "axios";
import { domainUrl } from "../config/baseUrl";
import { IProduct } from "../interfaces/IProduct";

export const useGetProduct = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const url = `${domainUrl}/${id}`;
     axios({
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
      .catch(() => {
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
