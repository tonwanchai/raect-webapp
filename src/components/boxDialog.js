import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Box, Button} from "@mui/material"

export default function BoxDialog(props) {
  const { onClose, open, data } = props;

  const handleClose = () => {
    onClose(false);
    window.location.reload()
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          style: { width: '50%',height: '500px' },
        }}
      >
        <DialogContent sx={{alignContent:'center'}}>
            <DialogContentText id="alert-dialog-description" sx={{textAlign:'center', marginTop:'2rem', fontSize:'48px'}}>
              {data.name}
            </DialogContentText>
            <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}>

              <img
                src={data.image}
                alt="fruit"
                style={{ width: "300px", height: "300px"}}
              />
            </Box>
        </DialogContent>
        <DialogActions>
          <Box textAlign='center'>
            <Button onClick={handleClose} variant="contained">
              Done
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
