import axios from "axios";

export const getProductList = async () => {
  let { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/products`
  );

  return data;
};

export const parseCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};
