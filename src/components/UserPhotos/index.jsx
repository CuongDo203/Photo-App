import React, { useEffect, useState } from "react";
import {
  Grid, Card, CardMedia, CardContent, Typography, FormControl, Button,
  TextField, Box
} from "@mui/material";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
// import fetchModel from "../../lib/fetchModelData";
import axios from "axios";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos({ isLoggedIn }) {

  const { userId } = useParams();
  const [userPhotos, setUserPhotos] = useState([]);
  const [comment, setComment] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSubmit = (photoId) => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const user_id = sessionStorage.getItem('user_id');
        let res = await axios.post(`http://localhost:8081/api/photos/commentsOfPhoto/${photoId}`, {
          comment: comment[photoId],
          user_id: user_id
        },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        if (res.status === 200) {
          console.log('Thêm thành công!');
          setLoading(false);
        }
        else {
          console.log('Thêm thất bại! ');
        }
        setComment('');
      }
      catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchData();
  }

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        const token = sessionStorage.getItem('token');
        const res = await axios.get(`http://localhost:8081/api/photos/photosOfUser/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserPhotos(res.data);
        setLoading(false);
      }
      fetchData();
    }
  }, [isLoggedIn, userId, userPhotos])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  if (isLoggedIn) {
    return !loading && (
      <Grid container spacing={2} alignItems="center" justifyContent="center" className="container">
        {userPhotos.length === 0 ? <h2>This user has not posted any photos yet</h2> : userPhotos.map((photo) => {
          return (
            <Grid item xs={12} md={9} key={photo._id} style={{ marginLeft: '100px' }}>
              <Card className="photoDesOfUser">
                <Box height={450} sx={{ objectFit: "cover" }}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:8081/images/${photo.file_name}`}
                    alt={photo.file_name}
                    className="photo"
                    sx={{ height: "100%", width: "100%" }}
                  />
                  {/* {photo.file_name} */}
                </Box>
                <CardContent>
                  <Typography variant="body2">Date: {formatDate(photo.date_time)}</Typography>
                  <Typography variant="h6">Comments:</Typography>

                  {photo.comments && photo.comments.map((comment) => (
                    <div key={comment._id}>
                      <Typography variant="body2">{formatDate(comment.date_time)}</Typography>
                      <Typography variant="body1">
                        <Link to={`/users/${comment.user._id}`}>
                          {`${comment.user.first_name} ${comment.user.last_name}`}
                        </Link>: {comment.comment}
                      </Typography>
                    </div>
                  ))}
                  <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                    <TextField
                      label="New comment"
                      value={comment[photo._id] || ''}
                      onChange={(e) => setComment({ ...comment, [photo._id]: e.target.value })}
                      fullWidth
                    />
                    <Button variant="outlined" onClick={() => handleSubmit(photo._id)}>Post</Button>
                  </FormControl>

                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    );
  }
}

export default UserPhotos;
