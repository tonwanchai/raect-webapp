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
  useEffect(() => {
    const fetchData = async () => {
      const fruitsData = await getFruits();
      const queueData = await getFruitQueue();
      let getNameFromQueue = []
      console.log("fetch data;m", fruitsData);
      console.log("fecth data", queueData);
      setFruits(fruitsData);
      queueData.forEach((data) => {
        getNameFromQueue.push(fruitsData.filter((fruit) => fruit._id === data.fruitID))
      })
      getNameFromQueue = getNameFromQueue.flat()
      setNameFruitInQueue(getNameFromQueue)
      setQueue(queueData);
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
      const create = await createCart({name: getFirstFruit.name})
    }

    // คลิกกล่อง
    // เอาค่าแรกจากคิวมาแสดงและลบออกจากคิว

    //Set data from queue to dataFromQueue
    //Update data in queue
    //Push data after random to dataFromRandom  >>>>>> oldArray => [...oldArray, newElement]
    //Cart data need to use Database too
    setDataCart(dataCart => [...dataCart, getFirstFruit])
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
          data={dataCart}
          stateChanger={setDataCart}
        />
      }
    </>
  );
}