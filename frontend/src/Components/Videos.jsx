import React, { useContext, useEffect, useRef } from "react";
import { Box, Button, Card, Stack, Typography } from "@mui/material";

import { SocketContext } from "../Context";
import { CallEndRounded } from "@mui/icons-material";

const Videos = () => {
  const {
    callAccepted,
    userVideo,
    stream,
    call,
    name,
    leaveCall,
    callEnded,
  } = useContext(SocketContext);

  const myVideoRef = useRef();

  useEffect(() => {
    const getMyMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        myVideoRef.current.srcObject = mediaStream;
      } catch (error) {
        console.error("Error accessing user media:", error);
      }
    };

    getMyMedia();

    return () => {
      if (myVideoRef.current.srcObject) {
        const tracks = myVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [callEnded]);

  return (
    <Stack
      width={"90%"}
      direction={'column'}
      p={"0.5em"}
      borderRadius={"1em"}
      justifyContent={"space-evenly"}
      height={{ xs: "auto", sm: "50vh" }}
      gap={"2em"}
    >
      <Stack gap={'2em'} direction={{ xs: "column-reverse", sm: "row-reverse" }}
      >
        {stream && (
          <Card
            sx={{
              width: { xs: "auto", sm: "max-content" },
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#ffffff1a",
              padding: "0.5em",
            }}
          >
            <video
              style={{ width: "100%", height: "100%" }}
              playsInline
              muted
              ref={myVideoRef}
              autoPlay
            />
            <Typography
              sx={{ position: "absolute", color: "#fff", bottom: "0" }}
              variant="h5"
              gutterBottom
            >
              {name || ""}
            </Typography>
          </Card>
        )}

        {callAccepted && !callEnded && userVideo && (
          <Card
            sx={{
              width: { xs: "auto", sm: "max-content" },
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#ffffff1a",
              padding: "0.5em",
            }}
          >
            <video
              style={{ width: "100%", height: "100%" }}
              playsInline
              ref={userVideo}
              autoPlay
            />
            <Typography
              sx={{ position: "absolute", color: "#fff", bottom: "0" }}
              variant="h5"
              gutterBottom
            >
              {call.name || ""}
            </Typography>
          </Card>
        )}
      </Stack>

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {callAccepted && !callEnded && (
          <Button
            sx={{ marginTop: { xs: "3em", sm: "5em" } }}
            variant="contained"
            color="error"
            onClick={leaveCall}
            startIcon={<CallEndRounded />}
          >
            Hang up
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default Videos;
