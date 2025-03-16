import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog({pdf,handleDelete}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button variant="outlined" onClick={handleClickOpen}>
        Delete 
      </button>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        // aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
           Do You Want to delete The Bill {pdf.name}
        </DialogTitle>  
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
           Cancel
          </Button>
          <Button onClick={()=>{
            handleDelete(pdf.serialNO);
            handleClose()
          }} autoFocus>
             Yes Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
