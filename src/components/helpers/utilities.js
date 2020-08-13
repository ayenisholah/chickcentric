import Axios from "axios";

export const postRequest = async (route, payload) => {
  try {
    const response = await Axios.post(
      `https://lit-sands-58479.herokuapp.com/${route}`,
      payload
    );
    return response;
  } catch (error) {
    return error.message;
  }
};
