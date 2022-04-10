import axios from "axios";
import { domainUrl } from "../config/baseUrl";

export const useEditProduct = (id,data) => {
    async function editProduct() {
        domainUrl
    const url = `${domainUrl}/${id}`;
     axios({
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
      })
      .catch((err) => {
        console.log(err);
      });
    }
    editProduct();
  return {
    data,
  };
};

