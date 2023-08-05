import React, { useContext, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, PhoneRounded } from '@mui/icons-material';
import { Message } from './'
import { SocketContext } from '../Context';


const Options = ({ children }) => {
  const { name, setName, me, setModal, callUser } = useContext(SocketContext)

  const [idToCall, setIdToCall] = useState('');
  const [msg, setMsg] = useState(false);
  const [err, setErr] = useState(false);

  const CopyText = () => {
    setMsg(true);
    setTimeout(() => {
      setMsg(false);
    }, 2000);
  }

  const CallUser = (idToCall) => {
    if (idToCall !== me) {
      if (idToCall.length > 0) {
        setModal(true);
        callUser(idToCall);
      }
    }
    else {
      setIdToCall('');
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  }
  return (
    <Stack width={{ xs: '100%', md: '50%' }} height={'40%'} justifyContent={'center'}>
      {msg && <Message msg={msg} />}
      {err && <Message err={err} />}
      <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
        <Box sx={{ background: 'transparent', display: 'flex', gap: '1em' }}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder='Your Calling Name'
            style={{
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
          <CopyToClipboard text={me}>
            <Button sx={{ width: { xs: '35%' } }} onClick={CopyText} variant='contained' color='primary' startIcon={<Assignment fontSize='large' />}>Copy ID</Button>
          </CopyToClipboard>
        </Box>

        <Box sx={{ background: 'transparent', display: 'flex', gap: '1em' }}>
          <input type="text"
            value={idToCall} onChange={(e) => setIdToCall(e.target.value)}
            placeholder='Enter Calling ID'
            style={{
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

          <Button sx={{ width: { xs: '35%', sm: '35%' } }} variant='contained' color='primary' onClick={() => CallUser(idToCall)} startIcon={<PhoneRounded fontSize='large' />}>Call</Button>

        </Box>
      </form>

      {children}

    </Stack>
  )
}

export default Options