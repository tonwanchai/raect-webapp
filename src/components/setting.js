import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
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
import { deleteFruit, getFruitQueue } from "../api";
import { Redirect } from "react-router";
import { set } from "mongoose";

const ItemSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  marginTop: "5px",
  width: "100%",
  color: theme.palette.text.secondary,
}));

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
  };

  const handleClickAddSelectBox = () => {
    setAddSelectBox([...addSelectBox]);
  };

  const handleClickDeleteFruit = async (id) => {
    const result = await deleteFruit(id);
    window.location.reload();
  };

  const handleClickAddQueue = () => {
    setQueue([...queue, { fruitID: "" }]);

  };

  const handleClickDeleteQueue = (index) => {
    console.log(queue)
    console.log(index)
    let arrQueue = queue
    arrQueue.splice(index,1)
    console.log(arrQueue)
    setQueue([...arrQueue])
  }

  const handleChangeSelectBox = (e,index) => {
    let arrQueue = queue
    arrQueue[index] = e.target.value
    console.log(arrQueue[index], index)
    setQueue([...arrQueue])
  }

  if (!loading) return <>loading</>;
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ border: "1px dashed grey", width: "45%", height: 824 }}>
          <br />
          <Stack spacing={2} sx={{ width: "80%", margin: "auto" }}>
            {fruits.map((fruit) => (
              <Box fullWidth sx={{ display: "flex" }}>
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
        <Box sx={{ border: "1px dashed grey", width: "45%", height: 824 }}>
          <br />

          <Stack spacing={2} sx={{ width: "80%", margin: "auto" }}>
            {queue.map((data, index) => (
              <Box fullWidth sx={{ display: "flex" }}>
                <Box sx={{ width: "90%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {index + 1}
                    </InputLabel>
                    <Select
                      labelId="fruit-queue"
                      id={data._id}
                      defaultValue={data.fruitID}
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
                    style={{ fontSize: 30, backgroundColor: "transparent" }}
                    onClick={() => handleClickDeleteQueue(index)}
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
            <Box sx={{ margin: "auto" }}>
              <Button variant="contained">Confirm</Button>
              <Button variant="contained">Delete All</Button>
            </Box>
          </Box>
        </Box>
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
