import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Modal, Typography, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/profileActions";
import { Buffer } from "buffer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Update = ({ open, handleClose, profile }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    profilePhoto: null,
  });
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setFormData({
        firstname: profile.firstname,
        lastname: profile.lastname,
        username: profile.username,
        profilePhoto: null,
      });
      if (profile.profilePhoto && profile.profilePhoto.data) {
        setPreview(
          `data:${profile.profilePhoto.contentType};base64,${Buffer.from(
            profile.profilePhoto.data.data
          ).toString("base64")}`
        );
      }
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePhoto: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append("firstname", formData.firstname);
    updateData.append("lastname", formData.lastname);
    updateData.append("username", formData.username);
    if (formData.profilePhoto) {
      updateData.append("profilePhoto", formData.profilePhoto);
    }

    dispatch(updateProfile(updateData));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Profile
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="firstname"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={formData.firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Profile Photo
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </Grid>
            {preview && (
              <Grid item xs={12}>
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    maxHeight: 200,
                    objectFit: "cover",
                    marginTop: 2,
                  }}
                  src={preview}
                  alt="Profile Photo Preview"
                />
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Update;
