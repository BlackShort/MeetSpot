import React, { useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Computer, Options } from './';
import { SocketContext } from '../Context';


const Home = () => {
    const { name } = useContext(SocketContext);

    return (
        <>
            <Stack
                width={"-webkit-fill-available"}
                height={{ xs: "max-content", md: "65%" }}
                direction={{ xs: "column-reverse", md: "row" }}
                gap={"1em"}
            >
                <Stack
                    gap={"1em"}
                    width={{ xs: "auto", md: "55%" }}
                    justifyContent={"center"}
                >
                    <Stack minHeight={{ xs: "auto", sm: "50%" }} gap={"1em"}>
                        <Typography variant="h4">
                            Feel Secure & Talk Unlimited with Unrestricted Video Meetings!
                        </Typography>
                        <Typography variant="subtitle1">
                            Empowering seamless video meetings without boundaries, MeetSpot presents a groundbreaking platform open to all users. Say hello to hassle-free communication as we provide a secure and unrestricted video meeting experience, making it freely accessible to everyone.
                        </Typography>
                    </Stack>
                </Stack>
                <Box
                    sx={{
                        width: { xs: "auto", md: "45%" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position:'relative',
                        padding:{xs:'2em 0 3em 0',md:'0'}
                    }}
                >
                    <Stack alignItems={'center'} justifyContent={'center'}>
                        <Computer />
                    </Stack>
                    <Typography variant="h6" align="center" sx={{position:'absolute',bottom:'0'}}>
                        Welcome {name}!
                    </Typography>
                </Box>
            </Stack>
            <Options />
        </>
    );
};

export default Home;
