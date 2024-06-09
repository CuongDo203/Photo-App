import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const defaultTheme = createTheme();


function Register() {
  const [newUser, setNewUser] = useState({
    firstName: "", lastName: "", username: "", password: "",
    retypedPassword: "", location: "", description: "", occupation: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (/^\s*$/.test(newUser.firstName)) {
        toast.error('The first name field cannot be left blank');
        return;
      }
      if (/^\s*$/.test(newUser.lastName)) {
        toast.error('The last name field cannot be left blank');
        return;
      }
      if (/^\s*$/.test(newUser.username)) {
        toast.error('The username field cannot be left blank');
        return;
      }
      if (/^\s*$/.test(newUser.password)) {
        toast.error('The password field cannot be left blank');
        return;
      }
      if(newUser.password !== newUser.retypedPassword) {
        toast.error('Password and retyped password do not match');
        return;
      }
      const res = await axios.post("http://localhost:8081/api/user", { ...newUser })
      if (res.status === 200) {
        toast.success('Account successfully created!')
        navigate("/user/login")
      }
      else {
        toast.error('Account creation failed! Username already exists')
      }
    }
    catch (err) {
      console.log('Tạo tài khoản thất bại!');
      toast.error('Account creation failed! Username already exists');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 0, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => {
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => {
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => {
                    setNewUser({ ...newUser, username: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setNewUser({ ...newUser, password: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="retypedPassword"
                  label="RetypedPassword"
                  type="password"
                  id="retypedPassword"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setNewUser({ ...newUser, retypedPassword: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="location"
                  label="Location"
                  id="location"
                  onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  onChange={(e) => setNewUser({ ...newUser, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="occupation"
                  label="Occupation"
                  id="occupation"
                  onChange={(e) => setNewUser({ ...newUser, occupation: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/user/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register
