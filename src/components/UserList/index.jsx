import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider
} from "@mui/material";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const users = models.userListModel();
  return (
    <div className="sidebar">
      <Typography style={{
        fontSize: 35,
        fontWeight: 900
      }} className="header" variant="h6">Users</Typography>
      <List style={{ backgroundColor: '#e7eaf6', height: '500px', minHeight: '100vh', borderRadius: 10}} component="nav">
        {users.map((user) => (
          <ListItem key={user._id}>
            <Link to={`/users/${user._id}`} className="listUser">
              <ListItemText primary={user.first_name + " " + user.last_name} />
              <Divider />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UserList;
