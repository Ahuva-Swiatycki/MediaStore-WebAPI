import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SignInSignUp from './SignInSignUp';
import '../Css/SignInSignUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setUserId } from '../reducers/userSlice';

const Layout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userName = useSelector((state) => state.user.userName);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const storedUserName = localStorage.getItem('userName');
      const storedUserId = localStorage.getItem('userId');
      if (storedUserName) {
        dispatch(setUserName(storedUserName));
      }
      if (storedUserId) {
        dispatch(setUserId(storedUserId));
      }
    }
  }, [dispatch]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");
    if (confirmSignOut) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
      dispatch(setUserName(''));
      dispatch(setUserId(''));
      handleMenuClose();
      navigate('/');
    }
  };

  const handleSignIn = () => {
    setShowAuthModal(false);
    setIsAuthenticated(true);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-options">
          <div data-id="btn13" className="btn13">
            <NavLink to="/">
              <span data-hover="HomePage">HomePage</span>
            </NavLink>
          </div>
          <div data-id="btn13" className="btn13">
            <NavLink to="/about">
              <span data-hover="About">About</span>
            </NavLink>
          </div>
          <div data-id="btn13" className="btn13">
            <NavLink to="/contact">
              <span data-hover="Contact">Contact</span>
            </NavLink>
          </div>
          <div data-id="btn13" className="btn13">
            <NavLink to="/Products">
              <span data-hover="Products">Products</span>
            </NavLink>
          </div>
        </div>
        <div className="navbar-icons">
          <div className='cart-icon'>
            <Link to="/cart">
              <IconButton color="primary" aria-label="add to shopping cart" style={{ color: 'white' }}>
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Link>
          </div>
          <div>
            <IconButton
              color="primary"
              aria-label="user"
              style={{ color: 'white' }}
              onClick={handleMenuOpen}
            >
              <PersonRoundedIcon />
              {isAuthenticated && (
                <span style={{ marginLeft: '8px', color: 'white' }}>{userName}</span>
              )}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {!isAuthenticated ? (
                <MenuItem key="SignIn/SignUp" onClick={() => { setShowAuthModal(true); handleMenuClose(); }}>Sign In / Sign Up</MenuItem>
              ) : (
                <>
                  <MenuItem key="orders" onClick={() => { navigate('/user/orders'); handleMenuClose(); }}>Orders</MenuItem>
                  <MenuItem key="account"onClick={() => { navigate('/user/account'); handleMenuClose(); }}>Account</MenuItem>
                  <MenuItem key="SignOut" onClick={() => { handleSignOut(); handleMenuClose(); }}>Sign Out</MenuItem>
                </>
              )}
            </Menu>
          </div>
        </div>
      </nav>
      <Outlet />
      {showAuthModal && (
        <>
          <div className="overlay" />
          <div className="auth-modal">
            <SignInSignUp onSignIn={handleSignIn} />
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
