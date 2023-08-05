import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../Context';
import { LockRounded, Person } from '@mui/icons-material';

const DetailsModal = () => {
    const { detail, setDetail, setName } = useContext(SocketContext);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setName(storedUserName);
            setDetail(false);
        } else {
            setDetail(true);
        }
    }, [setDetail,setName]);

    const UserName = (e) => {
        if (userName.length > 0) {
            setName(userName);
            setDetail(false);
            localStorage.setItem('userName', userName);
            localStorage.setItem('detail', false);
        } else {
            return;
        }
    }

    return (
        <>
            {detail && (
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
                    <form noValidate autoComplete="off" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ width: '50%', justifyContent: 'center', alignItems: 'center', height: '10vh', background: 'transparent', display: 'flex', flexDirection: 'column', gap: '1em' }}>
                            <Avatar sx={{ background: '#ffffff12' }}><LockRounded /></Avatar>
                            <Typography variant="h6">Enter UserName</Typography>
                            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
                                placeholder='Your UserName'
                                style={{
                                    textAlign: 'center',
                                    width: '56%',
                                    border: '1px solid gray',
                                    background: 'transparent',
                                    padding: '0.5em 1em',
                                    outline: 'none',
                                    height: '5vh',
                                    fontSize: '1rem',
                                    borderRadius: '0.25em',
                                    color: '#fff',
                                }} />
                            <Box mt={'0.5em'}>
                                <Button variant="contained" color="primary" startIcon={<Person />} onClick={UserName}>Save</Button>
                            </Box>
                        </Box>
                    </form>
                </Stack>
            )}
        </>
    );
};

export default DetailsModal;
