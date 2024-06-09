import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
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
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const defaultTheme = createTheme();

function Login({ onLogin }) {
  const [creds, setCreds] = useState({});
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!creds.username || !creds.password) {
      toast.error('Username/Password is required');
      return;
    }
    try {
      let res = await axios.post("http://localhost:8081/api/admin/login", creds)
      if (res.status === 200) {
        onLogin && onLogin({ _id: res.data._id });
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('user_id', res.data._id);
        sessionStorage.setItem('first_name', res.data.first_name)
        navigate('/users/' + res.data._id);
      }
      else {
        onLogin(null);
      }
    }
    catch (err) {
      console.log(err);
      toast.error('Login failed! Please check your username and password again.')
    }
  }

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setCreds({ ...creds, username: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/user/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      
    </ThemeProvider>
  );
}

export default Login;
