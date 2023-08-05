import React, { useContext, useState } from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip } from '@mui/material';
import { Person, Logout } from '@mui/icons-material';
import { SocketContext } from '../Context';


export default function AccountMenu() {

  const [anchorEl, setAnchorEl] = useState(null);
  const { setDetail, setName } = useContext(SocketContext);
  const open = Boolean(anchorEl);

  const OpenDetail = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const CloseDetail = () => {
    setAnchorEl(null);
  };

  const OpenModal = () => {
    setDetail(true);
  };

  const LogOut = () => {
    setName('');
    setDetail(true);
    localStorage.setItem('userName', '');
    CloseDetail();
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={OpenDetail}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={CloseDetail}
        onClick={CloseDetail}
        PaperProps={{
          elevation: 0,
          sx: {
            background: '#323232',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: '#323232',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={OpenModal}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={LogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
