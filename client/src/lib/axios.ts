import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});

export const apiClientMulti = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "multiport/form-data"
    }
})