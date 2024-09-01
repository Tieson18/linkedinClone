import React, { useState } from 'react'
import { Avatar, Box, Button, Container, Popover, Stack, Typography } from '@mui/material'
import logo from "../assets/home-logo.svg"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Input } from 'antd'
import "../Styles/header.css"
import search from "../assets/search-icon.svg"
import home from "../assets/nav-home.svg"
import network from "../assets/nav-network.svg"
import jobs from "../assets/nav-jobs.svg"
import message from "../assets/nav-messaging.svg"
import notification from "../assets/nav-notifications.svg"
import down from "../assets/down-icon.svg"
import work from "../assets/nav-work.svg"
import { useDispatch } from 'react-redux'
import { auth } from '../Database/firebase'
import { signOut } from 'firebase/auth'
import { clearUser } from '../store/slice/userSlice'


const Header = ({ userPhoto, userID }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const navIcons = [
        { title: "Home", icon: home, to: "/home" },
        { title: "My Network", icon: network, to: "/network" },
        { title: "Jobs", icon: jobs, to: "/jobs" },
        { title: "Messaging", icon: message, to: "/messaging" },
        { title: "Notifications", icon: notification, to: "/notification" },
    ]
    const [anchorEl, setAnchorEl] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(anchorEl)
    };

    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(false);
    };

    console.log("StoreInfo", userPhoto, userID);


    const handleSignOut = () => {
        if (userID) {
            signOut(auth)
                .then(() => {
                    dispatch(clearUser)
                    navigate("/")
                    window.location.reload()
                    console.log('User signed out');
                }).catch((e) => {
                    alert(e.message);
                });
        }
    }

    return (
        <Box component={"header"} className='header__section'>
            <Container maxWidth={"xl"} className='header__container'>
                <Link to={"/home"} style={{ marginRight: "8px" }}>
                    <img src={logo} alt="" />
                </Link>
                <Stack className='search__container'>
                    <form action="submit">
                        <Input className='input__bar' type='text' placeholder='Search' prefix={<Box component={"img"} mr={1} src={search} alt="" />} />
                    </form>
                </Stack>
                <Stack className='nav__links'
                    sx={{
                        position: { xs: "fixed", md: "relative" },
                        left: { xs: 0, md: "auto" },
                        bottom: { xs: 0, md: "auto" },
                        bgcolor: "white",
                        width: { xs: "100%", md: "auto" },
                    }}>
                    {navIcons.map((link, i) => (
                        <Stack key={i} sx={{
                            minWidth: { xs: "70px", md: "80px" },
                            alignItems: "center",
                        }}>
                            <NavLink to={link.to}>
                                <Box component={"img"} src={link.icon} />
                                {link.title}
                            </NavLink>
                        </Stack>
                    ))}
                    <Stack sx={{
                        minWidth: { xs: "70px", md: "80px" },
                        alignItems: "center",
                    }}>
                        <NavLink to={"/"} className={"link__sect"} onMouseEnter={handleClick}>
                            <Avatar src={userPhoto} sx={{ width: 24, height: 24 }} />
                            <Typography variant='p'>Me<Box component={"img"} sx={{ height: "10px" }} src={down} /></Typography>
                        </NavLink>
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            sx={{
                                '& .MuiPaper-root': {
                                    border: 'transparent',
                                }
                            }}
                        >
                            <Button variant="contained" className='sign__out'
                                onClick={handleSignOut}
                            >Sign out</Button>
                        </Popover>
                    </Stack>
                    <Stack sx={{
                        minWidth: { xs: "70px", md: "80px" },
                        alignItems: "center",
                    }}>
                        <NavLink to={"/"} className={"link__sect"}>
                            <Box component={"img"} src={work} />
                            <Typography variant='p'>Work<Box component={"img"} sx={{ height: "10px" }} src={down} /></Typography>
                        </NavLink>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

export default Header