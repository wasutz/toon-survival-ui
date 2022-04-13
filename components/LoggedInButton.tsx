import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Photo from '@mui/icons-material/Photo';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { useEthers } from '@usedapp/core';
import Link from 'next/link';


const LoggedInButton = () => {
    const {deactivate, account} = useEthers()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const cropAddress = account && (account.substring(0, 8) + "..." +  account.slice(-5));

    return (
        <>
            <Button
                color="secondary"
                aria-controls="logged-in-button-menu"
                aria-haspopup="true"
                variant="contained"
                sx={{my: 1, mx: 2, width: '160px'}}
                onClick={handleOpenNavMenu}>
                {cropAddress}
            </Button>
            <Menu
                id="logged-in-button-menu"
                anchorEl={anchorElNav}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}>
                <Link href="/myItems" passHref>
                    <MenuItem disableRipple>
                        <Photo fontSize="small" />
                        My Items
                    </MenuItem>
                </Link>
                 <MenuItem onClick={deactivate} disableRipple>
                    <ExitToApp fontSize="small" />
                    Disconnect
                </MenuItem>
            </Menu>
        </>
    )
}

export default LoggedInButton;