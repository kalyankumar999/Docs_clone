import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import useStyles from './style';

const Buttons = (props)=> {
  const{label, onClick}=props;
  const {
    googleBtn,
  }=useStyles();

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={()=>onClick()}>
        {label}
      </Button>      
    </Stack>
  );
}
export default Buttons;
