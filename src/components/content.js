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
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    client
      .get()
      .then((res) => {
        setData(res.data)
        console.log(res)
        console.log(res.data)
      })
      .catch((err) => {
        setError(err)
      })
  },[])

  const handleClickOpenCheckButton = (event) => {
    setOpenCheckButton(true);
    setAnchorEl(event.currentTarget)
  };

  const handleCloseCheckButton = () => {
    setOpenCheckButton(false);
    setAnchorEl(null);
  };

  const handleClickOpenBoxButton = (event) => {
    setOpenBoxButton(true);
    //Set data from queue to dataFromQueue
    //Update data in queue
    //Push data after random to dataFromRandom  >>>>>> oldArray => [...oldArray, newElement]
    //Cart data need to use Database too
    setDataFromRandom(dataFromRandom => [...dataFromRandom, dataFromQueue])
  };

  const handleCloseBoxButton = () => {
    setOpenBoxButton(false);
  };

  const handleClickOpenCartButton = () => {
    setOpenCartButton(true);
  };

  const handleCloseCartButton = () => {
    setOpenCartButton(false);
  };
  
  if(!data) return <></>

  return (
    <>
      {/* {data[0].name} */}
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
          data={dataFromRandom}
        />
      }
    </>
  );
}