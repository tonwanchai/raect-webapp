import * as api from "../api";
export const getFruits = async () => {
  try {
    const { data } = await api.getFruits();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createFruit = async (todo) => {
  try {
    const { data } = await api.createFruit(todo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editFruit = async (id, todo) => {
  try {
    const { data } = await api.editFruit(id, todo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFruit = async (id) => {
  try {
    const { data } = await api.deleteFruit(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFruitQueue = async () => {
  try {
    const { data } = await api.getFruitQueue();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createFruitQueue = async () => {
  try {
    const { data } = await api.createFruitQueue();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createQueue = async () => {
  try {
    const { data } = await api.createQueue();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQueueByID = async (id) => {
  try {
    const { data } = await api.deleteQueueByID(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllQueue = async (data) => {
  console.log(data)
  try {
    const { data } = await api.deleteAllQueue(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getQueueAndFruitData = async() => {
  try{
    const { fruitData } = await api.getFruits()
    const { queueData } = await api.getFruitQueue()
    return fruitData
  } catch (error) {
    console.log(error)
  }
}

export const getCart = async() => {
  try{
    const { cartData } = await api.getCart()
    console.log( "In API file : ", cartData )
    return cartData
  } catch (error) {
    console.log(error)
  }
}

export const createCart = async(data) => {
  try {
    const { cartData } = await api.createCart(data)
    return cartData
  } catch (error){
    console.log(error)
  }
}

export const deleteAllCart = async() => {
  try {
    const { result } = await api.deleteAllCart()
    return result
  } catch (error) {
    console.log(error)
  }
}

export const updateQueueFruit = async(data) => {
  try {
    const { result } = await api.updateQueueFruit(data)
    return result
  } catch (error) {
    console.log(error)
  }
}

export const signIn = async(data) => {
  try {
    const result  = await api.signIn(data)
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}