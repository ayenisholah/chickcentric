import axios from "axios";

export const getProductList = async () => {
  let { data } = await axios.get(
    `${process.env.REACT_APP_HOST_ENDPOINT}/api/product`
  );

  return data;
};

export const parseCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};
