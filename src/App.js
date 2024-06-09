import './App.css';

import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/LoginRegister/Login"
import Register from './components/LoginRegister/Register'

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
    </div>
  );
}



const App = (props) => {
  const [user, setUser] = useState();
  const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => { 
    if(sessionStorage.getItem('token') && sessionStorage.getItem('user_id')){
      setLoginStatus(true);
    }
    else{
      setLoginStatus(false);
    }
  }, [user])

  return (
        <Grid container spacing={2} className="container">
          <Grid item xs={12}>
            <TopBar isLoggedIn={loginStatus} onLogout = {setUser} user={user}/>
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item" elevation={0}>
              {<UserList isLoggedIn={loginStatus}/>}
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item" elevation={0}>
              <Routes>
                <Route
                  path="/user/login"
                  element={<Login onLogin={setUser}/>}
                />
                <Route
                  path="/user/register"
                  element={<Register/>}
                />
                <Route path="/users" element={<UserList isLoggedIn={loginStatus} user={user}/>} />
                <Route
                  path="/users/:userId"
                  element={<UserDetail isLoggedIn={loginStatus}/>}
                />
                <Route
                  path="/photos/:userId"
                  element={<UserPhotos isLoggedIn={loginStatus}/>}
                />
                <Route
                  path="/"
                  element={<h1>Welcome to photo sharing app.</h1>}
                />
                <Route path='*' element={<NoMatch />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
  );
}

export default App;
