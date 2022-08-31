import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ListItemInQueue from "./listIteminQueue";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/material/styles";
import BoxDialog from "./boxDialog";
import CartDialog from "./cartDialog";
import axios from "axios";
import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  getFruits,
  getFruitQueue,
  deleteQueueByID,
  createCart,
  getCart,
} from "../functions";
import useDocumentTitle from "./useDocumentTitle";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

const baseURL = "http://localhost:5000/fruit/";
const client = axios.create({
  baseURL: baseURL,
});

const boxStyle = {
  marginTop: "100px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  cursor: "pointer",
};

const cartStyle = {
  cursor: "pointer",
}

const checkStyle = {
  cursor: "pointer",
}

export default function Content() {
  const checkResponsive = useMediaQuery('(min-width:900px)')
  useDocumentTitle("Play");
  const [openCheckButton, setOpenCheckButton] = React.useState(false);
  const [openBoxButton, setOpenBoxButton] = React.useState(false);
  const [openCartButton, setOpenCartButton] = React.useState(false);
  const [dataFromQueue, setDataFromQueue] = React.useState("Apple");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [fruits, setFruits] = useState([]);
  const [queue, setQueue] = useState([]);
  const [dataCart, setDataCart] = useState([]);
  const [nameFruitInQueue, setNameFruitInQueue] = useState([]);
  const [imgsrc, setImgsrc] = useState("./images/Box1.png");
  const [imgCheck, setImgCheck] = useState("./images/Check1.png")
  const [imgCart, setImgCart] = useState("./images/Chest-1.png")
  const [listItem, setListItem] = useState([{ name: "", count: 0, image: "" }]);
  let imgInterval;
  useEffect(() => {
    const fetchData = async () => {
      const fruitsData = await getFruits();
      const queueData = await getFruitQueue();
      const cartData = await getCart();
      setDataCart(cartData);
      let getNameFromQueue = [];
      setFruits(fruitsData);
      queueData.forEach((data) => {
        getNameFromQueue.push(
          fruitsData.filter((fruit) => fruit._id === data.fruitID)
        );
      });
      getNameFromQueue = getNameFromQueue.flat();
      setNameFruitInQueue(getNameFromQueue);
      let items = [];
      fruitsData.forEach((fruit) =>
        items.push([
          fruit.name,
          queueData.filter((queue) => queue.fruitID === fruit._id).length,
          fruit.image,
        ])
      );
      items = items.filter((item) => item[1] !== 0);
      setListItem(items);
      setQueue(queueData);
      const socket = socketIOClient(ENDPOINT);
      socket.on("FromAPI", (data) => {
        // console.log("socket data = ", data)
        // console.log("fruit = ", fruitsData)
        let items = [];
        setQueue(queueData);
        fruitsData.forEach((fruit) =>
          items.push([
            fruit.name,
            data.filter((queue) => queue.fruitID === fruit._id).length,
            fruit.image,
          ])
        );
        items = items.filter((item) => item[1] !== 0);
        // console.log("items = ", items)
        setListItem(items);

        // setResponse(data);
      });
    };
    fetchData();
    setLoading(true);
  }, []);

  const handleClickOpenCheckButton = (event) => {
    setOpenCheckButton(true);
    setImgCheck('./images/Check3.png')
    setAnchorEl(event.currentTarget);
  };

  const handleSetImgCheck = (path) => {
    setImgCheck(path)
  }
  
  const handleCloseCheckButton = () => {
    setOpenCheckButton(false);
    setAnchorEl(null);
  };

  const handleClickOpenBoxButton = async (event) => {
    let status = false;
    setImgsrc("./images/Box3.png");
    setTimeout(async () => {
      let getFirstFruit = [];
      if (nameFruitInQueue.length > 0) {
        setOpenBoxButton(true);
        let dataQueue = queue.shift();
        getFirstFruit = nameFruitInQueue.shift();
        setDataFromQueue(getFirstFruit);
        setQueue([...queue]);
        const deleteQueue = await deleteQueueByID(dataQueue._id);
        // const create = await createCart({name: getFirstFruit.name})
        if (localStorage.getItem("cart") === null) {
          let dataInCart = getFirstFruit.name
            ? [{ name: getFirstFruit.name, image: getFirstFruit.image }]
            : [];
          localStorage.setItem("cart", JSON.stringify(dataInCart));
        } else {
          let dataInCart = JSON.parse(localStorage.getItem("cart"));
          dataInCart.push({
            name: getFirstFruit.name,
            image: getFirstFruit.image,
          });
          localStorage.setItem("cart", JSON.stringify(dataInCart));
        }
      }
    }, 1000);
  };

  const handleCloseBoxButton = () => {
    setOpenBoxButton(false);
  };

  const handleClickOpenCartButton = async () => {
    setOpenCartButton(true);
    setImgCart("./images/Chest-3.png")
  };

  const handleCloseCartButton = () => {
    setOpenCartButton(false);
  };

  const handleMouseOver = () => {
    setImgsrc("./images/Box2.png");
  };

  const handleMouseOut = () => {
    clearInterval(imgInterval);
    setImgsrc("./images/Box1.png");
    imgInterval = null;
  };

  const ChangeBoxImage = () => {
    console.log(imgsrc === "./images/Box1.png");
    setImgsrc(
      imgsrc === "./images/Box1.png" ? "./images/Box2.png" : "./images/Box1.png"
    );
  };

  const handleMouseOutCheckButton = () => {
    if(!openCheckButton) setImgCheck("./images/Check1.png")
  }

  const handleMouseOverCheckButton = () => {
    if(!openCheckButton) setImgCheck("./images/Check2.png")
  }

  const handleMouseOverCartButton = () => {
    if(!openCartButton) setImgCart("./images/Chest-2.png")
  }

  const handleMouseOutCartButton = () => {
    if(!openCartButton) setImgCart("./images/Chest-1.png")
  }

  if (!loading) return <></>;

  return (
    <div>
      <img
        src={imgCheck}
        onMouseOut={handleMouseOutCheckButton}
        onMouseOver={handleMouseOverCheckButton}
        onClick={handleClickOpenCheckButton}
        style={checkStyle}
      />
      {/* <Button variant="contained" onClick={handleClickOpenCheckButton}>
        Check
      </Button> */}
      <br />
      <Box textAlign="center">
        <img
          src={imgsrc}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleClickOpenBoxButton}
          style={boxStyle}
        />
      </Box>
      <br />
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "100px" }}
      >
        <img
          src={imgCart}
          onMouseOver={handleMouseOverCartButton}
          onMouseOut={handleMouseOutCartButton}
          onClick={handleClickOpenCartButton}
          style={cartStyle}
        />

        {/* <IconButton
          aria-label="cart"
          color="primary"
          style={{ fontSize: 60 }}
          onClick={handleClickOpenCartButton}
        >
          <ShoppingCartIcon fontSize="inherit" />
        </IconButton> */}
      </Box>
      {openCheckButton && (
        <ListItemInQueue
          open={openCheckButton}
          onClose={handleCloseCheckButton}
          anchorEl={anchorEl}
          data={listItem}
          setImgCheck={setImgCheck}
        />
      )}
      {openBoxButton && (
        <BoxDialog
          open={openBoxButton}
          onClose={handleCloseBoxButton}
          data={dataFromQueue}
        />
      )}
      {openCartButton && (
        <CartDialog
          open={openCartButton}
          onClose={handleCloseCartButton}
          stateChanger={setDataCart}
          data={JSON.parse(localStorage.getItem("cart"))}
          setImgCart={setImgCart}
        />
      )}
    </div>
  );
}
