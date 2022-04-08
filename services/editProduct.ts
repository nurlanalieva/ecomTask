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

export const useEditProduct = (id,data) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [item, setItem] = useState<IProduct>();
// let item={};

//   useEffect(() => {
    async function editProduct() {
        domainUrl
    const url = `${domainUrl}/${id}`;
    const res = axios({
      method: "put",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data:data
    })
      .then((res) => {
          console.log(res);
          
          data = res.data;
        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        // setError(true);
      });
    }
    editProduct();
//   }, []);
  return {
    data,
    // loading,
    // error,
  };
};

