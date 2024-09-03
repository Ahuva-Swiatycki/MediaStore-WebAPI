import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { setUserId, setUserName } from '../reducers/userSlice';
import { signIn, createUser, getUserDetails } from '../service/usersService'; 
import { useNavigate } from 'react-router-dom';
import WelcomePage from './WelcomePage'; 
import '../Css/SignInSignUp.css';

const SignInSignUp = ({ onClose, onSignIn }) => {
  const [mode, setMode] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserNameInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserDetails = async (userId) => {
    try {
      const userDetails = await getUserDetails(userId);
      dispatch(setUserName(userDetails.userName));
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleSignUpSuccess = (userId) => {
    dispatch(setUserId(userId));
    fetchUserDetails(userId);
    setSignUpSuccess(true); 
    setMode('signin'); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submit Mode:', mode); 
    try {
      let response;
      if (mode === 'signup') {
        console.log('SignUp:', { userName, email, phoneNumber, password });
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        response = await createUser({ userName, email, phoneNumber, password });
        console.log('SignUp Response:', response);
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', userName);
          dispatch(setUserName(userName));
          dispatch(setUserId(response.userId));
          handleSignUpSuccess(response.userId);
        } else {
          setError('Sign Up failed');
        }
      } else {
        response = await signIn({ email, password });
        console.log('SignIn Response:', response);
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', response.userName);
          dispatch(setUserName(response.userName));
          dispatch(setUserId(response.userId));
          onSignIn();
        } else {
          setError('Invalid email or password');
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setError('An error occurred');
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (onClose) onClose();
  };

  const isSignUpValid = userName && email && phoneNumber && password && confirmPassword;
  const isSignInValid = email && password;
  const isFormValid = mode === 'signup' ? isSignUpValid : isSignInValid;

  return (
    <>
      {!welcomeOpen ? (
        <div className="modal" onClick={handleClose}>
          <div className="overlay" />
          <Box
            sx={{
              maxWidth: 400,
              margin: 'auto',
              backgroundColor: 'white',
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              zIndex: 1000,
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleClose(e);
              }}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'gray'
              }}
            >
              <CloseIcon />
            </IconButton>
            <Stack spacing={2}>
              <Button
                variant="contained"
                onClick={() => setMode('signin')}
                sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'gray' } }}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                onClick={() => setMode('signup')}
                sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'gray' } }}
              >
                Sign Up
              </Button>

              {signUpSuccess && ( 
                <Alert severity="success" onClose={() => setSignUpSuccess(false)}>Thank you for signing up! Please log in to continue.</Alert>
              )}

              <form onSubmit={handleSubmit}>
                {mode === 'signup' && (
                  <TextField
                    label="UserName"
                    variant="outlined"
                    fullWidth
                    value={userName}
                    onChange={(e) => setUserNameInput(e.target.value)}
                    margin="normal"
                  />
                )}
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                />
                {mode === 'signup' && (
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    margin="normal"
                  />
                )}
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {mode === 'signup' && (
                  <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(prev => !prev)} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!isFormValid}
                  sx={{ marginTop: 2, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'gray' } }}
                >
                  {mode === 'signup' ? 'Sign Up' : 'Log In'}
                </Button>
              </form>
              {error && <Alert severity="error">{error}</Alert>}
            </Stack>
          </Box>
        </div>
      ) : (
        <WelcomePage />
      )}
    </>
  );
};

export default SignInSignUp;
