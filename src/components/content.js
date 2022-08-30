import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import ListItemInQueue from './listIteminQueue';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/material/styles';
import BoxDialog from './boxDialog'
import CartDialog from './cartDialog'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { getFruits, getFruitQueue, deleteQueueByID, createCart, getCart } from '../functions'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

const baseURL = 'http://localhost:5000/fruit/'
const client =  axios.create({
  baseURL:baseURL
})

export default function Content() {
  const [openCheckButton, setOpenCheckButton] = React.useState(false);
  const [openBoxButton, setOpenBoxButton] = React.useState(false);
  const [openCartButton, setOpenCartButton] = React.useState(false);
  const [dataFromQueue, setDataFromQueue] = React.useState('Apple')
  const [dataFromRandom, setDataFromRandom] = React.useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [loading, setLoading] = useState(false);
  const [fruits, setFruits] = useState([]);
  const [queue, setQueue] = useState([]);
  const [dataCart, setDataCart] = useState([])
  const [nameFruitInQueue, setNameFruitInQueue] = useState([])
  const [response, setResponse] = useState("");
  const [listItem, setListItem] = useState([{name:'',count:0,image:''}])
  useEffect(() => { 
    
    const fetchData = async () => {
      const fruitsData = await getFruits();
      const queueData = await getFruitQueue();
      const cartData = await getCart();
      setDataCart(cartData)
      let getNameFromQueue = []
      setFruits(fruitsData);
      queueData.forEach((data) => {
        getNameFromQueue.push(fruitsData.filter((fruit) => fruit._id === data.fruitID))
      })
      getNameFromQueue = getNameFromQueue.flat()
      setNameFruitInQueue(getNameFromQueue)
      let items  = []
      fruitsData.forEach((fruit) => items.push([fruit.name, queueData.filter((queue) => queue.fruitID === fruit._id).length, fruit.image]))
      items = items.filter((item) => item[1] !== 0)
      setListItem(items)
      setQueue(queueData);
      const socket = socketIOClient(ENDPOINT);
      socket.on("FromAPI", data => {
        // console.log("socket data = ", data)
        // console.log("fruit = ", fruitsData)
        let items = []
        setQueue(queueData);
        fruitsData.forEach((fruit) => items.push([fruit.name, data.filter((queue) => queue.fruitID === fruit._id).length, fruit.image]))
        items = items.filter((item) => item[1] !== 0)
        // console.log("items = ", items)
        setListItem(items)

        // setResponse(data);
      });
    };
    fetchData();
    setLoading(true);
  }, []);

  const handleClickOpenCheckButton = (event) => {
    setOpenCheckButton(true);
    setAnchorEl(event.currentTarget)
  };

  const handleCloseCheckButton = () => {
    setOpenCheckButton(false);
    setAnchorEl(null);
  };

  const handleClickOpenBoxButton = async (event) => {
    let getFirstFruit = [];
    if (nameFruitInQueue.length > 0){
      console.log(queue)
      setOpenBoxButton(true);
      let dataQueue = queue.shift()
      getFirstFruit = nameFruitInQueue.shift()
      setDataFromQueue(getFirstFruit)
      setQueue([...queue])
      const deleteQueue = await deleteQueueByID(dataQueue._id)
      // const create = await createCart({name: getFirstFruit.name})
      if (localStorage.getItem('cart') === null) {
        let dataInCart = (getFirstFruit.name) ? ([{name: getFirstFruit.name, image: getFirstFruit.image}]):([])
        localStorage.setItem('cart', JSON.stringify(dataInCart))  
      } else{
        let dataInCart = JSON.parse(localStorage.getItem('cart'))
        dataInCart.push({name: getFirstFruit.name, image: getFirstFruit .image})
        localStorage.setItem('cart', JSON.stringify(dataInCart))
      }
      // localStorage.setItem(cart, ) 
    }

    // คลิกกล่อง
    // เอาค่าแรกจากคิวมาแสดงและลบออกจากคิว

    //Set data from queue to dataFromQueue
    //Update data in queue
    //Push data after random to dataFromRandom  >>>>>> oldArray => [...oldArray, newElement]
    //Cart data need to use Database too
    // setDataCart(dataCart => [...dataCart, getFirstFruit])
  };

  const handleCloseBoxButton = () => {
    setOpenBoxButton(false);
  };

  const handleClickOpenCartButton = async() => {
    
    setOpenCartButton(true);
  };

  const handleCloseCartButton = () => {
    setOpenCartButton(false);
  };
  
  if(!loading) return <></>

  return (
    <>
      <Button variant="contained" onClick={handleClickOpenCheckButton}>Check</Button>
      <br/>
      <Box textAlign='center'>
        <Button 
          sx={{ 
            marginTop :'200px',
            width:'30%', 
            height:'100px',
            fontSize:'72'
          }} 
          variant="contained"
          onClick={handleClickOpenBoxButton}
        >
          Click for random
        </Button>
      </Box>
      <br/>
      
      <Box sx={{display:'flex', justifyContent:'flex-end', marginTop:'200px'}}>
        <IconButton aria-label="cart" color="primary" style={{ fontSize: 60 }} onClick={handleClickOpenCartButton}>
          <ShoppingCartIcon fontSize="inherit"/>
        </IconButton>
      </Box>
      {openCheckButton &&
        <ListItemInQueue
          open={openCheckButton}
          onClose={handleCloseCheckButton}
          anchorEl={anchorEl}
          data={listItem}
        />
      }
      {openBoxButton &&
        <BoxDialog
          open={openBoxButton}
          onClose={handleCloseBoxButton}
          data={dataFromQueue}
        />
      }
      {openCartButton &&
        <CartDialog
          open={openCartButton}
          onClose={handleCloseCartButton}
          stateChanger={setDataCart}
          data={JSON.parse(localStorage.getItem('cart'))}
        />
      }
    </>
  );
}