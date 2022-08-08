import { Box, Button, IconButton, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddDialog from "./addDialog";
import EditDialog from "./editDialog";
import { createFruit, getFruits } from '../functions';

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Setting(props) {
  const [fruits, setFruits] = useState([])
  const [fruit, setFruit] = useState({name: '', image: ''})
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openEditItem, setOpenEditItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [addSelectBox, setAddSelectBox] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const result = await getFruits();
      console.log('fetch data;m', result)
      setFruits(result)
    }
    fetchData()
    setLoading(true)
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const result = await createFruit(fruit);

    setFruits([...fruits, result]);
  }

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
    setAddSelectBox([...addSelectBox, 
      
    ])
  }

  if(!loading) return <></>
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ border: "1px dashed grey", width: "45%", height: 824 }}>
          <br />
          <Stack spacing={2} sx={{ width: "80%", margin: "auto" }}>
            {fruits.map((fruit) => (
              <Item
                key={fruit.id}
                onClick={() => handleClickOpenEditItemButton(fruit)}
              >
                {fruit.name}
              </Item>
            ))}
            <IconButton
              aria-label="add"
              color="primary"
              style={{ fontSize: 30 }}
              onClick={handleClickOpenAddItemButton}
            >
              <AddBoxIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Box>
        <Box sx={{ border: "1px dashed grey", width: "45%", height: 824 }}>
          <br />

          <Stack spacing={2} sx={{ width: "80%", margin: "auto" }}>
            {addSelectBox.map((selectBox) => (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
             </FormControl>
            ))}
            <IconButton
              aria-label="add"
              color="primary"
              style={{ fontSize: 30 }}
            >
              <AddBoxIcon fontSize="inherit" />
            </IconButton>
          </Stack>
          <Box sx={{width: '100%', margin:"auto", display:'flex'}}>
            <Button variant="contained">Confirm</Button>
            <Button variant="contained">Delete All</Button>
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
