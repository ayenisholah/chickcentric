import axios from "axios";
import localstorage from "./localstorage";

export const Axios = () => {
  return axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: "https://lit-sands-58479.herokuapp.com",
  });
};

export const axiosWithAuth = () => {
  const customKey = localstorage.get() && "Bearer " + localstorage.get();

  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: customKey || "",
    },
    baseURL: "https://lit-sands-58479.herokuapp.com",
  });
};
