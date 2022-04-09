import axios from "axios";
import { domainUrl } from "../config/baseUrl";

export const useEditProduct = (id,data) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [item, setItem] = useState<IProduct>();
// let item={};

//   useEffect(() => {
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
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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

