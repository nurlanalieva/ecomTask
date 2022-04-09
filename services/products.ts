import { useEffect, useState } from "react";
import axios from "axios";
import { domainUrl } from "../config/baseUrl";
import { IProduct } from "../interfaces/IProduct";


export const useGetProducts = (open) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function getProduct() {
      axios({
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
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    }
    getProduct();
  }, [open]);
  return {
    products,
    loading,
    error,
  };
};

// export const getProducts = () => {
//     const res = axios({
//       method: "get",
//       url: domainUrl,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         console.log(res);
//         res.data;
//         false;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//       return res
// };
