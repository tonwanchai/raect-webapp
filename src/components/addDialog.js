import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import { createFruit } from "../functions";
export default function AddDialog(props) {
  const [fruit, setFruit] = useState({ name: "", image: "" });
  const { open, onClose } = props;
  const [imageFile, setImageFile] = useState(null);
  const [errorFruit, setErrorFruit] = useState(false)
  const handleClose = () => {
    onClose(false);
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

  const onSubmitHandler = async (e) => {
    setErrorFruit(false)
    if (fruit.name == ""){
      return setErrorFruit(true)
    }else{
      const result = await createFruit(fruit);
      onClose(false)
      window.location.reload()
    }
  };

  const handleChangeImage = (e) => {
    // setImageFile(URL.createObjectURL(event.target.files[0]));
    // setFruit({ ...fruit, image: base64 });
    // console.log(e.target.files[0]);
    // let { file } = this.state;

    // file = e.target.files[0];

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
      

    // this.setState({
    //   file: e.target.files[0]
    // });
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
              onChange={(e) => setFruit({ ...fruit, name: e.target.value })}
              error={errorFruit}
              helperText={errorFruit && "Please enter fruit name"}
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
                onChange={handleChangeImage}
                accept="image/*"
                id="raised-button-file"
                multiple
                type="file"
                hidden
              />
            </Button>
          </DialogContent>
          {fruit.image &&
            <img
              src={fruit.image}
              style={{ width: "100%", height: "60%", alignContent: "center" }}
            />
          }
          <Button
            onClick={() => onSubmitHandler()}
            fullWidth
            sx={{ marginTop: "20px" }}
            size="large"
            component="label"
            variant="contained"
          >
            {" "}
            Save{" "}
          </Button>
        </Container>
      </Dialog>
    </>
  );
}
