import React, { useContext } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { PhoneRounded, CallEndRounded } from "@mui/icons-material";

import { SocketContext } from "../Context";


const Notification = () => {

  const { answerCall, call, callAccepted, leaveCall, modal, setModal, RejectCall } =
    useContext(SocketContext);

  const AcceptCall = () => {
    setModal(false);
    answerCall();
  };

  const EndCall = () => {
    setModal(false);
    leaveCall();
    window.location.reload();
  };

  return (
    <>
      {(modal || (call.isReceivingCall && !callAccepted)) && (
        <Stack
          gap={"1em"}
          position={"absolute"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            background: "#0000008c",
            width: "-webkit-fill-available",
            height: "-webkit-fill-available",
            backdropFilter: "blur(10px)",
          }}
        >
          <Avatar sx={{ width: "5em", height: "5em" }} />
          <Typography variant="h6">{call.name || "Unknown"}</Typography>
          <Stack direction={"row"} gap={"2em"}>
            {call.isReceivingCall && <Button
              variant="contained"
              color="success"
              startIcon={<PhoneRounded />}
              onClick={AcceptCall}
            >
              Answer
            </Button>}
            <Button
              variant="contained"
              color="error"
              startIcon={<CallEndRounded />}
              onClick={call.isReceivingCall ? RejectCall : EndCall}
            >
              {call.isReceivingCall ? 'Reject' : 'End'}
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Notification;
