import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import ListItemInQueue from '../listIteminQueue';

export default function Content() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClickOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget)
  };

  const handleClose = (value) => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>Check</Button>
      <br/>
      <Box textAlign='center'>
        <Button 
          sx={{ 
            marginTop :'200px',
            width:'30%', 
            height:'100px',
            fontSize:'72'
          }} 
          variant="contained"
        >
          Click for random
        </Button>
        <ListItemInQueue
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
        />
      </Box>
    </>
  );
}