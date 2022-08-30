import axios from 'axios';
const config = {
    headers: {
        Authorization: `JWT ${localStorage.getItem('access_token')}`
    }
}
const url = "http://localhost:5000/fruit";
const url2 = "http://localhost:5000"
export const getFruits = ()=>axios.get(url, config);
export const createFruit = (fruit)=>axios.post(`${url}/create-fruit`, fruit, config);
export const editFruit = (id,fruit)=>axios.put(`${url}/update-fruit/${id}`, fruit, config)
export const deleteFruit = (id)=>axios.delete(`${url}/delete-fruit/${id}`, config)
export const getFruitQueue = ()=>axios.get(`${url}/queue`, config)
export const createFruitQueue = (queue)=>axios.post(`${url}/queue/create-queue`, queue, config)
export const createQueue = (queue)=>axios.post(`${url}/queue/update`, queue, config).then(res => res.data)
export const deleteQueueByID = (id)=>axios.delete(`${url}/queue/delete/${id}`, config)
export const deleteAllQueue = (data)=>axios.delete(`${url}/queue/delete-all`, config)
export const getCart = ()=>axios.get(`${url}/cart`, config)
export const deleteAllCart = ()=> axios.delete(`${url}/cart/delete`, config)
export const createCart = (data)=> axios.post(`${url}/cart/create`, { data : {fruitID : data} }, config)
export const updateQueueFruit = (data) => axios.put(`${url}/queue/update-fruit`, {fruitID : data}, config)
export const signIn = (data) => axios.post(`${url2}/auth/sign_in`, data, config).then(res => res.data).catch((error) => error.response)