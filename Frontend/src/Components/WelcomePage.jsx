import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WelcomePage = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.user.userName);

  const handleNavigation = (path) => {
    navigate(path);
    handleClose(); 
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="welcome-dialog-title"
      aria-describedby="welcome-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="welcome-dialog-title">ברוך הבא, {userName}!</DialogTitle>
      <DialogContent>
        <Typography variant="h6" id="welcome-dialog-description">
          לאן תרצה להגיע?
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
          <Button variant="contained" onClick={() => handleNavigation('/cart')} sx={{ margin: 1 }}>
            Cart
          </Button>
          <Button variant="contained" onClick={() => handleNavigation('/products')} sx={{ margin: 1 }}>
            Products List
          </Button>
          <Button variant="contained" onClick={() => handleNavigation('/user/account')} sx={{ margin: 1 }}>
            Account
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomePage;
