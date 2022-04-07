import * as React from 'react';
import {useEffect, useState} from 'react';
import {useTheme} from 'next-themes';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LightMode from '@mui/icons-material/LightModeRounded';
import DarkMode from '@mui/icons-material/DarkModeRounded';
import Link from "next/link";
import { useEthers } from '@usedapp/core'
import LoggedInButton from '../components/LoggedInButton';

const pages = [
    {
        name:'Home',
        path: '/'
    },
    {
        name: 'FAQ',
        path: '/faq'
    },
    {
        name: 'Mint',
        path: '/mint'
    }
];

const Navbar = () => {
    const {activateBrowserWallet, account} = useEthers()
    const {resolvedTheme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <></>
        );
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Typography variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                    <Link href={'/'} passHref={true}>
                        Toon Survival
                    </Link>
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Menu id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}>
                        {pages.map((page) => (
                            <Link key={page.name} href={page.path} passHref={true}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            </Link>
                        ))}
                    </Menu>
                </Box>
                    <Typography variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        Toon Survival
                    </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map(page => (
                        <Link key={page.name} href={page.path} passHref={true}>
                            <Button onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page.name}
                            </Button>
                        </Link>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <IconButton sx={{ p: 0 }}
                        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
                            {
                                resolvedTheme === "light"
                                    ? <DarkMode htmlColor="#fff" />
                                    : <LightMode htmlColor="#fff" />
                            }
                    </IconButton>
                    {!account ? (
                        <Button onClick={() => activateBrowserWallet()} variant="contained" color="secondary" sx={{ my: 1, mx: 2 }}>
                            Connect wallet
                        </Button>
                    ) : (
                        <LoggedInButton />
                    )}
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;