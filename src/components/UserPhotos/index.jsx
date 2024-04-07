import React from "react";
import { Typography, CardMedia } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const user = useParams();
  const photosOfCurrentUser = models.photoOfUserModel(user.userId);
  
  return (
    <Typography variant="body1">
      {/* This should be the UserPhotos view of the PhotoShare app. Since it is
        invoked from React Router the params from the route will be in property
        match. So this should show details of user:
        {user.userId}. You can fetch the model for the user
        from models.photoOfUserModel(userId): */}
      {/* {console.log(photosOfCurrentUser)} */}
      {photosOfCurrentUser.map((item) => (
        <div key={item._id}>
          <img src={`../images/kenobi1.jpg`} alt="Ảnh nè"/>
          {/* <CardMedia 
            component="img"
            src={`../images/kenobi1.jpg`}
          /> */}
          <h5>{item.date_time}</h5>
          <ul>
            {item.comments && item.comments.map(cmt => (
              <li key={cmt._id}>
                <h3>{cmt.user.first_name}</h3>
                <p>{cmt.comment}</p>
                <i className="cmt-datetime">{cmt.date_time}</i>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Typography>
  );
}

export default UserPhotos;
