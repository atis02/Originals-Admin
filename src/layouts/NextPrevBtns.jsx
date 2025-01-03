import React from "react";
import { Button, Stack } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const NavbarBtns = () => {
  const handleBack = () => {
    window.history.back();
  };

  const handleNext = () => {
    window.history.forward();
  };

  return (
    <Stack
      direction="row"
      ml={2}
      spacing={1}
      justifyContent="center"
      alignItems="center"
      //   mt={2}
    >
      <Button
        onClick={handleBack}
        sx={{ minWidth: 45, height: 35, p: 0, color: "inherit" }}
        variant="outlined"
        // color="primary"
      >
        <ArrowBackIosNewIcon sx={{ width: 20, height: 20 }} />
      </Button>
      <Button
        onClick={handleNext}
        sx={{ minWidth: 45, height: 35, p: 0, color: "inherit" }}
        variant="outlined"
        // color="primary"
      >
        <ArrowForwardIosIcon sx={{ width: 20, height: 20, p: 0 }} />
      </Button>
    </Stack>
  );
};

export default NavbarBtns;
