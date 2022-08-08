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
  const handleClose = () => {
    onClose(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const result = await createFruit(fruit);
    onClose(false)
  };

  const handleChangeImage = (event, { base64 }) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
    setFruit({ ...fruit, image: base64 });
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
            />
            <Button
              fullWidth
              sx={{ marginTop: "20px" }}
              size="large"
              component="label"
              variant="contained"
            >
              Upload Image
              <FileBase64
                type="file"
                multiple={false}
                onDone={(e, { base64 }) => handleChangeImage}
                hidden
              />
            </Button>
          </DialogContent>
          <img
            src={imageFile}
            style={{ width: "100%", height: "60%", alignContent: "center" }}
          />
          <Button
            onClick={onSubmitHandler}
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
