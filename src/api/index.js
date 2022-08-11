import axios from 'axios';
const url = "http://localhost:5000/fruit";
export const getFruits = ()=>axios.get(url);
export const createFruit = (fruit)=>axios.post(`${url}/create-fruit`, fruit);
export const editFruit = (id,fruit)=>axios.put(`${url}/update-fruit/${id}`, fruit)
export const deleteFruit = (id)=>axios.delete(`${url}/delete-fruit/${id}`)
export const getFruitQueue = ()=>axios.get(`${url}/queue`)
export const createFruitQueue = ()=>axios.post(`${url}/queue/create-queue`)