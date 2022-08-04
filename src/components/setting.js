import { Box, Button, IconButton, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddDialog from "./addDialog";
import EditDialog from "./editDialog";

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Setting(props) {
  const [items, setItems] = useState([["Apple"], ["Banana"]]);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openEditItem, setOpenEditItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [addSelectBox, setAddSelectBox] = useState([])

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
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ border: "1px dashed grey", width: "45%", height: 824 }}>
          <br />
          <Stack spacing={2} sx={{ width: "80%", margin: "auto" }}>
            {items.map((item) => (
              <Item
                key={item}
                onClick={() => handleClickOpenEditItemButton(item)}
              >
                {item}
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
