import { Box, Stack } from '@mui/material'
import React, { useContext } from 'react'
import { SocketContext } from '../Context';


const Computer = () => {
    const { myVideo } = useContext(SocketContext);

    return (
        <Stack alignItems={'center'} position={'relative'} sx={{ scale: { xs: '1', md: '1.4' } }}>
            <div className='parent'>
                <div className="circle"></div>
                <div className='display' style={{ overflow: 'hidden' }}>
                    <video style={{ width: '100%' }} playsInline muted ref={myVideo} autoPlay />
                </div>
                <div className='bottom' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '0.5rem', fontWeight: '500', letterSpacing: '0.5px', fontFamily: 'sans-serif' }}>MeetSpot</div>
            </div>
            <Box className="stand"></Box>
            <Box className="circle1" ></Box>
            <Box className="circle2" ></Box>
        </Stack>
    )
}

export default Computer