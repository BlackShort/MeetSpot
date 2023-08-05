import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import img1 from '../assets/LookedUp.png';
import MenuBar from './MenuBar';

const Navbar = ({ Name }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ height: "6vh", padding: "0.5em 1em", background: "#323232" }}
    >
      <Box height={'100%'} sx={{display:'flex',alignItems:'center',gap:'1em'}}>
        <Typography variant="h4">{Name}</Typography>
        <img src={img1} style={{height:'100%'}} alt="Logo" />
      </Box>
      <MenuBar/>
    </Stack>
  );
};

export default Navbar;
