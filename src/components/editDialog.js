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
  
  const handleChangeImage = (e) => {
    getBase64(e.target.files[0])
    .then(result => {
      // file["base64"] = result;
      // console.log("File Is", file);
      // this.setState({
      //   base64URL: result,
      //   file
      // });
      setFruit({...fruit, image: result})
    })
    .catch(err => {
      console.log(err);
    });
  }

  const onSubmitEditHandler = async (e) => {
    e.preventDefault();
    console.log(data._id)
    console.log(fruit)
    const result = await editFruit(data._id, fruit);
    onClose(false)
  };

  const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
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
