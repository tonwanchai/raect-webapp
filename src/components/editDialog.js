import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";
import { useState } from "react";
import { editFruit } from "../functions";

export default function EditDialog(props) {
  const { data, onClose, open } = props;
  const [imageFile, setImageFile] = useState(null)
  const [fruit, setFruit] = useState({name:data.name, image:data.image})
  const handleClose = () => { 
    onClose(false);
  };

  const handleChangeName = (e) => {
    setFruit({ ...fruit, name: e.target.value })
  }
  
  const handleChangeImage = (event) => {
    setImageFile(URL.createObjectURL(event.target.files[0]))
  }

  const onSubmitEditHandler = async (e) => {
    e.preventDefault();
    console.log(data._id)
    console.log(fruit)
    const result = await editFruit(data._id, fruit);
    onClose(false)
  };
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
            <br />
            <TextField
              autoFocus
              fullWidth
              id="name"
              label="Name"
              variant="outlined"
              value={fruit.name}
              onChange={handleChangeName}
            />
            <Button
              fullWidth
              sx={{ marginTop: "20px" }}
              size="large"
              component="label"
              variant="contained"
            >
              Upload Image
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleChangeImage}
              />
            </Button>
          </DialogContent>
          <img
            src={fruit.image}
            style={{ width: "100%", height: "60%", alignContent: "center" }}
          />
          <Button
            variant="contained"
            onClick={onSubmitEditHandler}
            sx={{ marginTop: "20px" }}
            fullWidth
          >
            Update
          </Button>
        </Container>
      </Dialog>
    </>
  );
}
