import Axios from "axios";

export const loginRequest = async (route, payload) => {
  try {
    const response = await Axios.post(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/${route}`,
      payload
    );
    return response;
  } catch (error) {
    return error.message;
  }
};

export const postProductRequest = async (route, payload, token) => {
  try {
    const response = await Axios.post(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/${route}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
