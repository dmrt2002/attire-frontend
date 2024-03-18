import axios from "axios"

// const API_URL = "https://attire-strapi.onrender.com/api"
const API_URL = "https://attire-strapi-production.up.railway.app/api/"

export const loginUser = async (body) => {
    let res = await axios.post(`${API_URL}/auth`, body)
    return res
}

export const registerUser = async (body) => {
    let res = await axios.post(`${API_URL}/members`, body)
    return res
}

export const fetchAllProducts = async () => {
    let res = await axios.get(`${API_URL}/products`)
    return res
}

export const fetchProductById = async (productId) => {
    let res = await axios.get(`${API_URL}/products/${productId}`);
    return res
}

export const fetchProductByOrder = async (productId) => {
    const res = await axios.get(`${API_URL}/products/${productId}`);
    return res
}

export const fetchOrder = async (id) => {
    let res = await axios.post(`${API_URL}/orders/details`, { id: id })
    return res
}

export const createOrder = async (body) => {
    let res = await axios.post(`${API_URL}/orders`, body)
    return res
}