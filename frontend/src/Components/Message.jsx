import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Message = ({ msg, err }) => {
    return (
        <Stack spacing={2} right={'0'} left={'0'} position={'absolute'} top={'4em'} alignItems={'center'}>
            {msg && (
                <Alert sx={{ width: 'max-content', background: '#7bff7b', fontWeight: "500", fontSize: "1rem" }} severity="success">
                    Copied!
                </Alert>
            )}
            {err && (
                <Alert sx={{ width: 'max-content', background: '#ff7b7b', fontWeight: "500", fontSize: "1rem" }} severity="error">
                    Can not make Call
                </Alert>
            )}
        </Stack >
    );
}

export default Message