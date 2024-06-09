import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider
} from "@mui/material";
import "./styles.css";
import axios from "axios";

function UserList({isLoggedIn, user}) {
  const [loading, setLoading] = useState(true);
  const [listUser, setListUser] = useState([]);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(isLoggedIn) {
      const fetchData = async () => {
        try {
          const token = sessionStorage.getItem('token');
          if(token) {
            const res = await axios.get("http://localhost:8081/api/user/list", {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setListUser(res.data);
            setLoading(false);
          }
        }
        catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }
      fetchData();
    }
  }, [listUser.length, user, isLoggedIn])

  if (isLoggedIn) {
    return (
      <div className="sidebar">
        <Typography style={{
          fontSize: 35,
          fontWeight: 900
        }} className="header" variant="h6">Users</Typography>
        {loading ? (<p>Loading...</p>) :
          (<List style={{ backgroundColor: '#e7eaf6' }} component="nav">
            {listUser.map((user) => (
              <ListItem key={user._id}>
                <Link to={`/users/${user._id}`} className="listUser">
                  <ListItemText primary={user.first_name + " " + user.last_name} />
                  <Divider />
                </Link>
              </ListItem>
            ))}
          </List>)}
      </div>
    );
  }
  else {
    return (
      <Typography variant="body1">
        Please log in to see the full user list.
      </Typography>
    );
  }
}

export default UserList;
