import React, { useContext } from 'react';
import { Stack } from '@mui/material';

import { Navbar, Videos,Home, Notification, DetailsModal } from './Components';
import { SocketContext } from './Context';

const App = () => {

  const { call, callAccepted} = useContext(SocketContext);

  return (
    <Stack height={'100vh'} overflow={"hidden"}>
      <Navbar Name={'MeetSpot'} />
      <Stack
        direction={"column"}
        gap={"1em"}
        sx={{ overflowY: { xs: "scroll", md: "clip" } }}
        p={{ xs: '1em', sm: '2em' }}
        height={"calc(100vh - (6vh + 1em))"}>
        {call.isReceivingCall || callAccepted ?
          <Videos />
          :
          <Home />
        }
      </Stack>
      <DetailsModal />
      <Notification />
    </Stack>
  );
};

export default App;