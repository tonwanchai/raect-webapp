import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from '@mui/material/Container';
import { useState } from 'react'
export default function AddDialog(props) {
  const { open, onClose } = props;
  const [imageFile, setImageFile] = useState(null)
  const handleClose = () => { 
    onClose(false);
  };

  const handleChangeImage = (event) => {
    setImageFile(URL.createObjectURL(event.target.files[0]))
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { width: "80%", height: "500px" },
        }}
      >
        <Container>
          <DialogContent>
            <br/>
            <TextField
              autoFocus
              fullWidth
              id="name"
              label="Name"
              variant="outlined"
            />
            <Button fullWidth sx={{marginTop:'20px'}} size="large" component="label" variant="contained">
              Upload Image
              <input hidden accept="image/*" multiple type="file" onChange={handleChangeImage} /> 
            </Button>
          </DialogContent>
          <img src={imageFile} style={{width:'100%', height:'60%', alignContent:'center'}}/>
          <Button fullWidth sx={{marginTop:'20px'}} size="large" component="label" variant="contained"> Save </Button>
        </Container>
      </Dialog>
    </>
  );
}
