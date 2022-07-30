import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box'
export default function ListItemInQueue(props) {
  const [listItem, setListItem] = useState([
    ['apple', 10],
    ['banana', 10],
    ['orange', 10],
    ['mango', 10],
    ['pineapple', 10]
  ]);
  const [Items, setItems] = useState({})
  const { onClose, open, anchorEl } = props;

  const handleClose = () => {
    onClose(false);
  };

  
  return (
    <>
      <Popover 
        onClose={handleClose} 
        open={open} 
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: { width: '20%' },
        }}
      >
        <List sx={{ pt: 0 }}>
          {listItem.map((item) => (
            <ListItem
              key={item[0]}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item[0]+" "+item[1]} />
            </ListItem>
          ))}
        </List>
  
      </Popover>
      {/* araigordai */}
    </>
  );
}

ListItemInQueue.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};