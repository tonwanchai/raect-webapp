import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box, Button, Typography, Stack, Avatar, ListItemAvatar, List } from "@mui/material";
import { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { getCart, deleteAllCart } from "../functions/index"
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CartDialog(props) {
  const { onClose, data, open, setImgCart } = props;
  const [loading, setLoading] = useState(false)
  const [dataCart, setDataCart] = useState((data === null)? []:data)
  const checkResponsive = useMediaQuery('(min-width:900px)')

  const handleClose = () => {
    setImgCart("./images/Chest-1.png")
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
          style: checkResponsive ? { width: "50%", height: "600px" } : {width: "100%", height: "600px"}
        }}
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{marginTop: "2rem" }}
          >
            <List sx={{ pt: 0 }}>
              {dataCart.map((data) => (
                <ListItem key={data._id} >
                  <ListItemAvatar >
                    <Avatar 
                      alt="fruit" 
                      imgProps={{
                        style: {margin:'auto'}
                      }}
                      src={data.image}
                    />
                  </ListItemAvatar>
                  <ListItemText disableTypography primary={<Typography fontSize={30}>{data.name}</Typography>} />
                </ListItem>
              ))}
            </List>
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
