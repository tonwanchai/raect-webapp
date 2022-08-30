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
import ImageUploading from "react-images-uploading";
import { createFruit } from "../functions";
import { getFruits } from "../api";
export default function AddDialog(props) {
  const [fruit, setFruit] = useState({ name: "", image: "" });
  const { open, onClose } = props;
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const [errorFruit, setErrorFruit] = useState(false);

  const imgStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20px'
  }

  const handleClose = () => {
    onClose(false);
  };

  const onSubmitHandler = async (e) => {
    setErrorFruit(false);
    if (fruit.name == "") {
      return setErrorFruit(true);
    } else {
      const result = await createFruit(fruit);
      onClose(false);
      window.location.reload();
    }
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    if(imageList[0]) setFruit({ ...fruit, image: imageList[0]["data_url"] });
    setImages(imageList);
  };

  // const getBase64 = (file) => {
  //   return new Promise((resolve) => {
  //     let fileInfo;
  //     let baseURL = "";
  //     // Make new FileReader
  //     let reader = new FileReader();

  //     // Convert the file to base64 text
  //     reader.readAsDataURL(file);

  //     // on reader load somthing...
  //     reader.onload = () => {
  //       // Make a fileInfo Object
  //       console.log("Called", reader);
  //       baseURL = reader.result;
  //       console.log(baseURL);
  //       resolve(baseURL);
  //     };
  //     console.log(fileInfo);
  //   });
  // };

  // const handleChangeImage = (e) => {
  //   getBase64(e.target.files[0])
  //     .then((result) => {
  //       setFruit({ ...fruit, image: result });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
            <ImageUploading
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <Button
                    fullWidth
                    sx={{marginTop: '20px'}}
                    variant="contained"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </Button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="300" style={imgStyle} />
                     
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </DialogContent>
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
