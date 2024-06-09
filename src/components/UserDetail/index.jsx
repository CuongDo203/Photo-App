import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import { useParams } from "react-router-dom";
import axios from "axios";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail({ isLoggedIn }) {
  const { userId } = useParams();
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const user = await axios.get(`http://localhost:8081/api/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(user.data);
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [userId])

  if (!isLoggedIn) return (<p>Login to see user details</p>);
  else {
    return (
      <div className="main-section">
        <Card>
          <CardContent>
            <Typography variant="h5">{user.first_name} {user.last_name}</Typography>
            <Typography variant="body2">Location: {user.location}</Typography>
            <Typography variant="body2">Description: {user.description}</Typography>
            <Typography variant="body2">Occupation: {user.occupation}</Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to={`/photos/${userId}`}>
              Photos
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default UserDetail;
