import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function CartDialog(props) {
  const { data, onClose, open } = props;
  const [dataInCart, setDataInCart] = useState(data);

  const handleClose = () => {
    onClose(false);
  };

  const clearData = () => {
    console.log(data)
    setDataInCart([]);
  };

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
            {dataInCart.map((data) => (
              <ListItem key={data}>
                <ListItemText primary={data} />
              </ListItem>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box textAlign="center">
            <Button onClick={clearData} variant="contained">
              Clear
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
