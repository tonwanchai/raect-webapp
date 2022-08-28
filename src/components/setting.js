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

import DeleteIcon from "@mui/icons-material/Delete";
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
  const [fruits, setFruits] = useState([]);
  const [fruit, setFruit] = useState({ name: "", image: "" });
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openEditItem, setOpenEditItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [addSelectBox, setAddSelectBox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queue, setQueue] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const fruitsData = await getFruits();
      const queueData = await getFruitQueue();
      console.log("fetch data;m", fruitsData);
      console.log("fecth data", queueData.data);
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
    window.location.reload();
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
  };

  const handleClickDeleteQueue = (index) => {
    console.log(queue);
    console.log(index);
    let arrQueue = queue;
    arrQueue.splice(index, 1);
    console.log(arrQueue);
    setQueue([...arrQueue]);
  };

  const handleChangeSelectBox = (e, index) => {
    let arrQueue = queue;
    arrQueue[index].fruitID = e.target.value;
    console.log(arrQueue[index], index);
    setQueue([...arrQueue]);
  };

  const handleClickConfirm = async () => {
    console.log("create queue", queue);
    const result = createQueue(queue);
    window.location.reload();
  };

  const handleClickDeleteWithIndex = async (id) => {
    const result = deleteQueueByID(id);
    window.location.reload();
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
              sx={{
                border: "1px line grey",
                backgroundColor: "#d9d9d9",
                width: "80%",
                height: 824,
                overflow: "auto",
              }}
            >
              <br />
              <Stack spacing={2} sx={{ width: "80%", margin: "auto" }}>
                {fruits.map((fruit) => (
                  <Box fullWidth key={fruit._id} sx={{ display: "flex" }}>
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
              sx={{
                backgroundColor: "#d9d9d9",
                width: "80%",
                height: 824,
                overflow: "auto",
                marginLeft: "auto"
              }}
            >
              <br />

              <Stack spacing={2} sx={{ width: "80%", margin: "auto" }}>
                {queue.map(
                  (data, index) =>
                    data.fruitID !== "undefined" && (
                      <Box fullWidth sx={{ display: "flex" }}>
                        <Box sx={{ width: "90%" }}>
                          <FormControl fullWidth>
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
                              {fruits.map((fruit) => (
                                <MenuItem value={fruit._id}>
                                  {fruit.name}
                                </MenuItem>
                              ))}
                            </Select>
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
                            onClick={() => handleClickDeleteWithIndex(data._id)}
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
      {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ border: "1px line grey", backgroundColor:'#d9d9d9', width: "45%", height: 824, overflow:'auto' }}>
          <br />
          <Stack spacing={2} sx={{ width: "80%", margin: "auto" }}>
            {fruits.map((fruit) => (
              <Box fullWidth key={fruit._id} sx={{ display: "flex" }}>
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
        <Box sx={{ backgroundColor:'#d9d9d9', width: "45%", height: 824, overflow:'auto'  }}>
          <br />

          <Stack spacing={2} sx={{ width: "80%", margin: "auto" }}>
            {queue.map((data, index) => (
              (data.fruitID !== "undefined") &&
                <Box fullWidth sx={{ display: "flex" }}>
                  <Box sx={{ width: "90%" }}>
                    <FormControl fullWidth>
                      <InputLabel sx={{marginTop: "5px", backgroundColor:'transparent'}} id="demo-simple-select-label">
                        {index + 1}
                      </InputLabel>
                      <Select
                        labelId="fruit-queue"
                        id={data._id}
                        value={data.fruitID}
                        sx={{marginTop: "5px", backgroundColor:'#FFFFFF'}}
                        size='small'
                        label="Fruit name"
                        onChange={(e) => handleChangeSelectBox(e, index)}
                      >
                        {fruits.map((fruit) => (
                          <MenuItem value={fruit._id}>{fruit.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ width: "10%" }}>
                    <IconButton
                      color="error"
                      disableFocusRipple
                      disableTouchRipple
                      aria-label="add"
                      style={{ fontSize: 30, backgroundColor: "transparent"}}
                      // onClick={() => handleClickDeleteQueue(index)}
                      onClick={()=>handleClickDeleteWithIndex(data._id)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              
              // <></>
            ))}
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
            <Box sx={{ margin: "auto", marginTop: '5px' }} fullWidth>
              <Button variant="contained" onClick={handleClickConfirm}>Confirm</Button>
              {" "}
              <Button variant="contained" onClick={handleClickDeleteAll}>Delete All</Button>
            </Box>
          </Box>
        </Box>
      </Box> */}

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
