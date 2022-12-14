import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddDialog from "./addDialog";
import EditDialog from "./editDialog";
import { createFruit, getFruits } from "../functions";
import io from "socket.io-client"
import DeleteIcon from "@mui/icons-material/Delete";
import useDocumentTitle from './useDocumentTitle'
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  deleteFruit,
  getFruitQueue,
  createFruitQueue,
  createQueue,
  deleteQueueByID,
  deleteAllQueue,
  updateQueueFruit,
} from "../api";
import { useHistory } from "react-router-dom";
import FormHelperText from '@mui/material/FormHelperText';
const URL = "http://localhost:5000/"
const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  marginTop: "5px",
  width: "100%",
  color: theme.palette.text.secondary,
}));


export default function Setting(props) {
  const checkResponsive = useMediaQuery('(min-width:900px)')
  useDocumentTitle("Setting")
  const [fruits, setFruits] = useState([]);
  const [fruit, setFruit] = useState({ name: "", image: "" });
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openEditItem, setOpenEditItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [addSelectBox, setAddSelectBox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queue, setQueue] = useState([]);
  const [errorQueue, setErrorQueue] = useState([])
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const fruitsData = await getFruits();
      const queueData = await getFruitQueue();
      // console.log("fetch data;m", fruitsData);
      // console.log("fecth data", queueData.data);
      queueData.data.forEach((queue) => errorQueue.push(false))
      setFruits(fruitsData);
      setQueue(queueData.data);
    };
    fetchData();
    setLoading(true);
  }, []);

  const handleClickOpenAddItemButton = () => {
    setOpenAddItem(true);
  };

  const handleCloseAddItemButton = () => {
    setOpenAddItem(false);
  };

  const handleClickOpenEditItemButton = (item) => {
    setSelectedItem(item);
    setOpenEditItem(true);
  };

  const handleCloseEditItemButton = () => {
    setOpenEditItem(false);
  };

  const handleClickAddSelectBox = () => {
    setAddSelectBox([...addSelectBox]);
  };

  const handleClickDeleteFruit = async (id) => {
    const result = deleteFruit(id);
    const updateQueue = updateQueueFruit(id);
    window.location.reload();
  };

  const handleClickAddQueue = () => {
    setQueue([...queue, { fruitID: " " }]);
    setErrorQueue([...errorQueue, false])
  };

  const handleClickDeleteQueue = (index) => {
    let arrQueue = queue;
    let arrErrorQueue = errorQueue
    arrErrorQueue.splice(index, 1)
    arrQueue.splice(index, 1);
    setQueue([...arrQueue]);
    setErrorQueue([...arrErrorQueue])
  };

  const handleChangeSelectBox = (e, index) => {
    let arrQueue = queue;
    arrQueue[index].fruitID = e.target.value;
    console.log(arrQueue[index], index);
    setQueue([...arrQueue]);
  };

  const handleClickConfirm = async () => {
    let arrErrorQueue = errorQueue
    let status = false
    queue.forEach((q,index) => {
      if (q.fruitID == " ") {
        arrErrorQueue[index] = true 
        status = true
      }
    })

    if (status) return setErrorQueue([...arrErrorQueue])

    const result = createQueue(queue);
    window.location.reload();
  };

  const handleClickDeleteWithIndex = async (id, index) => {
  
    if(!id) handleClickDeleteQueue(index)
    else{
      const result = await deleteQueueByID(id);
      window.location.reload();
    }
    // const getQueue = queue.find()
  };

  const handleClickDeleteAll = () => {
    const result = deleteAllQueue();
    window.location.reload();
  };

  const handleButtonBack = (pageURL) => {
    history.push(pageURL);
    window.location.reload();
  };

  if (!loading) return <>loading</>;
  return (
    <>
      {/* <Box>
        <Button size="large" onClick={() =>handleButtonBack('/')}>{"<==="}</Button>
      </Box> */}
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          columns={12}
          
        >
          <Grid item xs={12} md={6} key={1}>
            <Box
              sx={ checkResponsive?
                {
                  border: "1px line grey",
                  backgroundColor: "#d9d9d9",
                  width: "80%",
                  height: 824,
                  overflow: "auto",
                } :
                {
                  border: "1px line grey",
                  backgroundColor: "#d9d9d9",
                  width: "100%",
                  height: 824,
                  overflow: "auto",
                }
            }
            >
              <br />
              <Stack spacing={2} sx={{ width: "80%", margin: "auto" }}>
                {fruits.map((fruit, index) => (
                  <Box fullWidth key={fruit._id} sx={{ display: "flex" }} >
                    <Box sx={{ width: "90%" }}>
                      <Item
                        key={fruit._id}
                        onClick={() => handleClickOpenEditItemButton(fruit)}
                      >
                        {fruit.name}
                      </Item>
                    </Box>
                    <Box sx={{ width: "10%" }}>
                      <IconButton
                        color="error"
                        disableFocusRipple
                        disableTouchRipple
                        aria-label="add"
                        style={{ fontSize: 30, backgroundColor: "transparent" }}
                        onClick={() => handleClickDeleteFruit(fruit._id)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
                <IconButton
                  disableFocusRipple
                  disableTouchRipple
                  aria-label="add"
                  color="primary"
                  style={{ fontSize: 30, backgroundColor: "transparent" }}
                  onClick={handleClickOpenAddItemButton}
                >
                  <AddBoxIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} key={2}>
            <Box
              sx={!checkResponsive ? {
                backgroundColor: "#d9d9d9",
                width: "100%",
                height: 824,
                overflow: "auto",
                
              }:
              {
                backgroundColor: "#d9d9d9",
                width: "80%",
                height: 824,
                overflow: "auto",
                marginLeft: "auto"
              }
              }
            >
              <br />

              <Stack spacing={2} sx={{ width: "80%", margin: "auto" }}>
                {queue.map(
                  (data, index) =>
                    data.fruitID !== "undefined" && (
                      <Box fullWidth sx={{ display: "flex" }} key={index}>
                        <Box sx={{ width: "90%" }}>
                          <FormControl fullWidth error={errorQueue[index]}>
                            <InputLabel
                              sx={{
                                marginTop: "5px",
                                backgroundColor: "transparent",
                              }}
                              id="demo-simple-select-label"
                            >
                              {index + 1}
                            </InputLabel>
                            <Select
                              labelId="fruit-queue"
                              id={data._id}
                              value={data.fruitID}
                              sx={{
                                marginTop: "5px",
                                backgroundColor: "#FFFFFF",
                              }}
                              size="small"
                              label="Fruit name"
                              onChange={(e) => handleChangeSelectBox(e, index)}
                            >
                              <MenuItem value=" " />
                              {fruits.map((fruit) => (
                                <MenuItem value={fruit._id} key={fruit._id}>
                                  {fruit.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {errorQueue[index] && <FormHelperText>Please select the fruit</FormHelperText>}
                          </FormControl>
                        </Box>
                        <Box sx={{ width: "10%" }}>
                          <IconButton
                            color="error"
                            disableFocusRipple
                            disableTouchRipple
                            aria-label="add"
                            style={{
                              fontSize: 30,
                              backgroundColor: "transparent",
                            }}
                            // onClick={() => handleClickDeleteQueue(index)}
                            onClick={() => handleClickDeleteWithIndex(data._id, index)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                      </Box>
                    )

                    // <></>
                )}
                <IconButton
                  disableFocusRipple
                  disableTouchRipple
                  aria-label="add"
                  color="primary"
                  onClick={handleClickAddQueue}
                  style={{ fontSize: 30, backgroundColor: "transparent" }}
                >
                  <AddBoxIcon fontSize="inherit" />
                </IconButton>
              </Stack>
              <Box sx={{ width: "100%", display: "flex" }}>
                <Box sx={{ margin: "auto", marginTop: "5px" }} fullWidth>
                  <Button variant="contained" onClick={handleClickConfirm}>
                    Confirm
                  </Button>{" "}
                  <Button variant="contained" onClick={handleClickDeleteAll}>
                    Delete All
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    
      {openAddItem && (
        <AddDialog open={openAddItem} onClose={handleCloseAddItemButton} />
      )}
      {openEditItem && (
        <EditDialog
          data={selectedItem}
          onClose={handleCloseEditItemButton}
          open={openEditItem}
        />
      )}
    </>
  );
}

{
  /* <input hidden accept="image/*" type="file" /> */
}
