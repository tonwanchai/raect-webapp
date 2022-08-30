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
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box'
export default function ListItemInQueue(props) {
  const [Items, setItems] = useState({})
  const { onClose, open, anchorEl, data, setImgCheck } = props;
  const [listItem, setListItem] = useState(data);
  
  const handleClose = () => {
    setImgCheck("./images/Check1.png")
    onClose(false);
  };

  
  return (
    <>
      <Popover 
        onClose={() => handleClose()} 
        open={open} 
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: { 
            width: '20%',
            overflow: 'auto'
          },
        }}
      >
        <List sx={{ pt: 0 }}>
          {listItem.map((item) => (
            <ListItem
              key={item[0]}
            >
              <ListItemAvatar>
                  <Avatar alt="fruit" src={item[2]}/>
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