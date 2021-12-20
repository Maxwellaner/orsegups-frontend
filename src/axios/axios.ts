import axios from "axios";
import apiUrl from "../api-url";

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-type": "application/json"
  }
});

export default instance;