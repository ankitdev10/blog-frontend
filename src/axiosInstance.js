import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://blog-api-c8cy.onrender.com/api"
})