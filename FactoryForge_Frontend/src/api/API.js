import axios from "axios";

export const API = axios.create({
  baseURL: "https://factoryforge-5f88b931d18d.herokuapp.com/api/",
});
