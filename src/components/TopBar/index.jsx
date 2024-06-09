import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Avatar, Box, Tooltip,
  IconButton, Divider, ListItemIcon, Button,
}
  from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("Please login!");
  const [selectedUserId, setSelectedUserId] = useState();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate('/user/login')
  }

  const handleAddPhoto = async (e) => {
    const { files } = e.target;
    if(files) {
      try {
        const userId = sessionStorage.getItem('user_id');
        const token = sessionStorage.getItem('token');
        if (token) {
          const formData = new FormData();
          formData.append('user_id', userId);
          formData.append('photo', files[0]);
          let res = await axios.post("http://localhost:8081/api/photos/new", formData,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              }
            });
          if (res.status === 200) {
            console.log('Add new photo successfully!');
            toast.success('Photo added successfully')
            navigate(`/photos/${userId}`);
          }
          else {
            console.log('Add new photo failed!');
          }
        }
      }
      catch (err) {
        console.error('Có lỗi xảy ra!', err);
        toast.error('Adding photos failed');
      }
    }
  }

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://localhost:8081/api/admin/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        toast.success('Logout successfully!')
        // setIsLoggedIn(false);
        setTitle("Please login!")
        navigate("/user/login");
        onLogout(null);
        sessionStorage.clear();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Lỗi: Người dùng hiện không đăng nhập');
        toast.error('Người dùng hiện không đăng nhập!')
      } else {
        console.error('Có lỗi xảy ra!', error);
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      const pathParts = location.pathname.split("/");
      // const currentView = pathParts[pathParts.length - 2];
      const userId = pathParts[pathParts.length - 1];
      setSelectedUserId(userId);
      const fetchData = async () => {
        try {
          const token = sessionStorage.getItem('token');
          if (token) {
            const user = await axios.get(`http://localhost:8081/api/user/${userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            // setIsLoggedIn(true)
            const firstName = sessionStorage.getItem('first_name');
            setUserName(user.data.first_name)
            setTitle("Hi, " + firstName + "!");
          }
        }
        catch (err) {

        }
      }
      fetchData();
    }
    else {
      setTitle("Please login!");
    }
  }, [isLoggedIn, location.pathname]);

  return (
    <AppBar className="topbar-appBar">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          color="inherit"
          style={{ textDecoration: "none" }}
        >
          {title}
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {isLoggedIn && (selectedUserId === sessionStorage.getItem('user_id')) && (<Box sx={{ display: { xs: 'flex', justifyContent: 'flex-end' } }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={2}
              startIcon={<CloudUploadIcon />}
              // onClick={() => handleAddPhoto()}
            >
              Add photo
              <VisuallyHiddenInput type="file" onChange={handleAddPhoto} formEncType="multipart/form-data" name="photo" />
            </Button>

          </Box>)}
        </Typography>
        {/* <Button variant="contained" onClick={handleLogin}>Login</Button> */}
        {(!isLoggedIn || !userName) ? (<Button variant="contained" onClick={handleLogin}>Login</Button>) : (<Typography variant="h6" component="div">
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>{sessionStorage.getItem('first_name')}</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Typography>)}
      </Toolbar>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
    </AppBar>
  );
}

export default TopBar;
