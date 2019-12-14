import axios from "axios";

export const axiosWithAuth = () => {
  const toke = localStorage.getItem("token");

  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: token
    }
  });
};