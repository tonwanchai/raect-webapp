import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function BoxDialog(props) {
  const { onClose, open, data } = props;
  const [isLoading, setIsLoading] = useState(false);
  const checkResponsive = useMediaQuery('(min-width:900px)')

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
  }, []);
  const handleClose = () => {
    onClose(false);
    window.location.reload();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          style: checkResponsive ? { width: "50%", height: "500px" } : { width: "100%", height: "500px"}
        }}
      >
        {isLoading && (
          <>
            <DialogContent sx={{ alignContent: "center" }}>
              <DialogContentText
                id="alert-dialog-description"
                sx={{
                  textAlign: "center",
                  marginTop: "2rem",
                  fontSize: "48px",
                }}
              >
                {data.name}
              </DialogContentText>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={data.image}
                  alt="fruit"
                  style={{ width: "300px", height: "300px" }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Box textAlign="center">
                <Button onClick={handleClose} variant="contained">
                  Done
                </Button>
              </Box>
            </DialogActions>
          </>
        )}

        {!isLoading && (
          <DialogContent sx={{marginTop: '25%'}}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={100} />
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
