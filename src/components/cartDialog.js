import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { getCart, deleteAllCart } from "../functions/index"
export default function CartDialog(props) {
  const { onClose, data, open, stateChanger } = props;
  const [loading, setLoading] = useState(false)
  const [dataCart, setDataCart] = useState(data)

  const handleClose = () => {
    onClose(false);
  };

  const handleClickClear = () => {
    setDataCart([])
    stateChanger([])
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { width: "50%", height: "600px" },
        }}
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{marginTop: "2rem" }}
          >
            {dataCart.map((data) => (
              <ListItem key={data._id}>
                <ListItemText primary={data.name} />
              </ListItem>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box textAlign="center">
            <Button onClick={() => handleClickClear()} variant="contained">
              Clear
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
