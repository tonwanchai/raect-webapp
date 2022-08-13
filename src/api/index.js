import axios from 'axios';
const url = "http://localhost:5000/fruit";
export const getFruits = ()=>axios.get(url);
export const createFruit = (fruit)=>axios.post(`${url}/create-fruit`, fruit);
export const editFruit = (id,fruit)=>axios.put(`${url}/update-fruit/${id}`, fruit)
export const deleteFruit = (id)=>axios.delete(`${url}/delete-fruit/${id}`)
export const getFruitQueue = ()=>axios.get(`${url}/queue`)
export const createFruitQueue = (queue)=>axios.post(`${url}/queue/create-queue`, queue)
export const createQueue = (queue)=>axios.post(`${url}/queue/update`, queue)
export const deleteQueueByID = (id)=>axios.delete(`${url}/queue/delete/${id}`)
export const deleteAllQueue = ()=>axios.delete(`${url}/queue/delete-all`)
export const getCart = ()=>axios.get(`${url}/cart`)
export const deleteAllCart = ()=> axios.delete(`${url}/cart/delete`)
export const createCart = (data)=> axios.post(`${url}/cart/create`, data)