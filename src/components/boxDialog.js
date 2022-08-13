import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Box, Button} from "@mui/material"

export default function BoxDialog(props) {
  const { onClose, open, data } = props;

  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { width: '50%',height: '400px' },
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{textAlign:'center', marginTop:'2rem', fontSize:'48px'}}>
            {data.name}
          </DialogContentText>
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
