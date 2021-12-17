import axios from "axios";

export const endpoint = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
});