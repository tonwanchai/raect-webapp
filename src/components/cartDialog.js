import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { getCart, deleteAllCart } from "../functions/index"
export default function CartDialog(props) {
  const { onClose, data, open, stateChanger } = props;
  const [loading, setLoading] = useState(false)
  const [dataCart, setDataCart] = useState((data === null)? []:data)

  const handleClose = () => {
    onClose(false);
  };

  const handleClickClear = () => {
    setDataCart([])
    localStorage.removeItem('cart')
    // stateChanger([])
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
                <ListItemText disableTypography primary={<Typography fontSize={30}>{data.name}</Typography>} />
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
