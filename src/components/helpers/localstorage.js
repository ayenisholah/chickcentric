import { isTokenExpired } from "./tokenVerification";

const KEY = "user-token";

export default {
  set: function (payload) {
    try {
      const item = JSON.stringify(payload);
      localStorage.setItem(KEY, item);
    } catch (error) {
      return undefined;
    }
  },

  get: function () {
    try {
      const item = localStorage.getItem(KEY);
      if (item === null) {
        return undefined;
      } else {
        return item;
      }
    } catch (error) {
      return undefined;
    }
  },

  clear: function () {
    localStorage.clear();
    window.location.href = "/";
  },
};
