import * as api from '../api';
export const getFruits = async()=>{
    try {
        const {data} = await api.getFruits();
        return data
    } catch (error) {
        console.log(error)
    }
}

export const createFruit = async(todo)=>{
try {
    const {data} = await api.createFruit(todo);
    return data
} catch (error) {
    console.log(error)
}
}

export const editFruit = async(id, todo)=>{
    try {
        const {data} = await api.editFruit(id, todo);
        return data
    } catch (error) {
         console.log(error)
    }
}