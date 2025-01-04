import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const Forms = ({ formData, setFormData }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  console.log(preview);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted successfully!");
    setPreview(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
        // maxWidth: 500,
        margin: "0 auto",
        padding: 2,
        // backgroundColor: "#f5f6fa",
        borderRadius: 4,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Text Fields */}
      <TextField
        label="Ady (TM)"
        name="Ady (TM)"
        autoComplete="off"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        sx={{ borderRadius: 2 }}
      />
      <TextField
        label="Ady (RU)"
        name="Ady (RU)"
        autoComplete="off"
        value={formData.email}
        onChange={handleChange}
        type="text"
        fullWidth
        required
        sx={{ borderRadius: 2 }}
      />
      <TextField
        label="Ady (EN)"
        name="Ady (EN)"
        autoComplete="off"
        value={formData.message}
        onChange={handleChange}
        fullWidth
        required
        sx={{ borderRadius: 2 }}
      />

      {/* File Input */}
      <Box>
        {preview && (
          <Box
            mt={1}
            sx={{
              textAlign: "center",
              border: "1px solid #474747",
              // padding: 2,
              borderRadius: 2,
              // backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h6" color="textSecondary" mb={1}>
              {formData.file?.name}
            </Typography>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Box>
        )}
        <Stack
          direction="row"
          justifyContent="end"
          mt={1}
          spacing={2}
          width="100%"
        >
          <Button
            component="label"
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              borderRadius: 3,
              padding: "10px 20px",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <AddPhotoAlternateIcon />
            Surat ýüklemek
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 3,
              padding: "10px 20px",
              fontSize: 16,
              bgcolor: "#00B69B",
              color: "#fff",
            }}
          >
            Goşmak
          </Button>
        </Stack>
      </Box>

      {/* Submit Button */}
    </Box>
  );
};

export default Forms;
