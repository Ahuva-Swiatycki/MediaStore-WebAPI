import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';

const User = ({ isLoggedIn, onSignOut }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userName = useSelector((state) => state.user.userName);
  const userId = useSelector((state) => state.user.userId); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("UserId in useEffect:", userId);
    if (!userId) {
    }
  }, [userId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    onSignOut();
    handleClose();
    navigate('/sign-out');
  };

  return (
    <div>
      <Button
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
        sx={{ color: 'white' }} 
      >
        {isLoggedIn && userName ? userName : 'User'}
      </Button>
      <Menu
  id="user-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  {isLoggedIn ? (
    [
      <MenuItem key="username" disabled>
        <div style={{ color: 'black' }}>{userName}</div>
      </MenuItem>,
      <MenuItem key="orders" onClick={() => { handleClose(); navigate('/user/orders'); }}>
        Orders
      </MenuItem>,
      <MenuItem key="account" onClick={() => { handleClose(); navigate('/user/account'); }}>
        Account
      </MenuItem>,
      <MenuItem key="logout" onClick={handleSignOut}>
        Log Out
      </MenuItem>
    ]
  ) : (
    <MenuItem key="login" onClick={() => { handleClose(); navigate('/sign-in'); }}>
      Log In
    </MenuItem>
  )}
</Menu>

    </div>
  );
  
};

export default User;
