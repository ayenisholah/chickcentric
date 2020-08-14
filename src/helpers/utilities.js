import axios from "axios";

export const getProductList = async () => {
  let { data } = await axios.get(
    "https://lit-sands-58479.herokuapp.com/api/product"
  );

  return data;
};
