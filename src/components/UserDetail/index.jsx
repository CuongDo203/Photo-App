import React from "react";
import {Typography} from "@mui/material";

import "./styles.css";
import {useNavigate, useParams} from "react-router-dom";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const user = useParams();
    const currentUser = models.userModel(user.userId)
    let navigate = useNavigate();

    const handleClick = () => {
      navigate(`/photos/${user.userId}`)
    }

    return (
        <>
          <Typography variant="body1">
            {/* This should be the UserDetail view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property match.
            So this should show details of user: {user.userId}.
            You can fetch the model for the user from models.userModel. */}
            <div key={currentUser._id}>
              <h1>{currentUser.first_name + ' ' + currentUser.last_name}</h1>
              <h3>{currentUser.location}</h3>
              <h3>{currentUser.occupation}</h3>
              <h4>{currentUser.description}</h4>
            </div>
            <button onClick={handleClick}>{`See ${currentUser.first_name}'s photos`}</button>
          </Typography>
        </>
    );
}

export default UserDetail;
