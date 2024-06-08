import React, { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/actions/profileActions";
import Update from "./Update";
import { Buffer } from 'buffer';

export default function Home() {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <Container component="main" maxWidth="xs">
        <Typography variant="h5" component="div" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container component="main" maxWidth="xs">
        <Typography variant="h5" component="div" align="center">
          No profile data available.
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          alt={profile.username}
          src={`data:${profile.profilePhoto.contentType};base64,${Buffer.from(
            profile.profilePhoto.data.data
          ).toString("base64")}`}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography component="h1" variant="h5">
          {profile.username}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" align="center">
              First Name: {profile.firstname}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" align="center">
              Last Name: {profile.lastname}
            </Typography>
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleOpen}>
          Update Profile
        </Button>
      </Box>
      <Update
        open={open}
        handleClose={handleClose}
        profile={profile}
      />
    </Container>
  );
}
