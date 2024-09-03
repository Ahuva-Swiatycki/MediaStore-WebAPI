import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUser, changePassword, deleteUser } from "../service/usersService";
import { setUserName } from '../reducers/userSlice';
import { useNavigate } from 'react-router-dom'; 
import { Container, Typography, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Delete } from '@mui/icons-material';
import '../Css/account.css'; 

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const userId = useSelector((state) => state.user.userId);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


    useEffect(() => {
      if (!userId) {
        console.error("User ID is not available");
        return;
      }
    
      const fetchUserDetails = async () => {
        try {
          const userDetails = await getUserDetails(userId);
          setFormData({
            userName: userDetails.userName || "",
            email: userDetails.email || "",
            phoneNumber: userDetails.phoneNumber || "",
          });
        } catch (error) {
          console.error("Failed to fetch user details", error);
        }
      };
    
      fetchUserDetails();
    }, [userId]);
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let validationErrors = {};

    if (!formData.userName.trim()) {
      validationErrors.userName = "UserName is required.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email address is invalid.";
    }

    if (!formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Phone Number is invalid. Must be 10 digits.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validatePasswordChange = () => {
    let passwordErrors = {};

    if (!passwordData.currentPassword.trim()) {
      passwordErrors.currentPassword = "Current password is required.";
    }

    if (passwordData.newPassword.length < 6) {
      passwordErrors.newPassword = "New password must be at least 6 characters.";
    }

    setErrors(passwordErrors);
    return Object.keys(passwordErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const updatedUser = await updateUser(userId, {
          userName: formData.userName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
        });
        dispatch(setUserName(updatedUser.userName));
        alert("User details updated successfully!");
      } 
      catch (error) {
        console.error('User update failed:', error);
        alert("Failed to update user details.");
      }
    }
  };
  
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (validatePasswordChange()) {
      try {
        await changePassword({
          userId,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        });
        alert("Password updated successfully!");
        setPasswordData({ currentPassword: "", newPassword: "" });
      } catch (error) {
        alert("Failed to update password.");
      }
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userId);
      alert("User deleted successfully!");

      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      dispatch(setUserName(''));
      navigate('/'); 
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>
      <div className="white-background"></div>
      <div className="grid-container">
        <div className="user-details">
          <Typography variant="h6">User Details</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="UserName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              error={!!errors.userName}
              helperText={errors.userName}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />

            <Button
              variant="contained"
              style={{
                backgroundColor: 'black',
                color: '#d7009f',
                marginTop: '20px',
              }}
              type="submit"
              fullWidth
            >
              Update Account
            </Button>
          </form>
        </div>

        <div className="change-password">
          <Typography variant="h6">Change Password</Typography>
          <form onSubmit={handlePasswordSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Current Password"
              name="currentPassword"
              type={showPassword ? "text" : "password"}
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              style={{
                backgroundColor: 'black',
                color: '#d7009f',
                marginTop: '20px',
              }}
              type="submit"
              fullWidth
            >
              Change Password
            </Button>
          </form>
        </div>
      </div>

      <div className="delete-section">
        <Button
          variant="contained"
          color="error"
          className="delete-button"
          onClick={handleClickOpenDeleteDialog}
        >
          <Delete /> Delete Account
        </Button>
        <Typography className="delete-message">
          Deleting your account will permanently remove your account and all associated data. This action cannot be undone.
        </Typography>
      </div>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>{"Are you sure you want to delete this account?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone and you will lose all your data.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="delete-dialog-actions">
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Account;
