import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import loginLogo from '../assets/login-logo.svg'
import "../Styles/login.css"
import hero from '../assets/login-hero.svg'
import google from '../assets/google.svg'
import { useDispatch, useSelector } from 'react-redux'
import { auth, provider } from '../Database/firebase'
import { setUser } from '../store/slice/userSlice'
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { useEffect } from 'react'


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userName = useSelector((store) => {
        return store.userStore.user.name
    })

    const userInfo = (user) => {
        dispatch(setUser({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            uid: user.uid,
            emailVerified: user.emailVerified
        }))
    }

    const handleAuth = () => {
        if (!userName) {
            signInWithPopup(auth, provider)
                .then((result) => {
                    userInfo(result.user);
                })
                .catch((e) => {
                    if (e.code === 'auth/cancelled-popup-request') {
                        alert("Authentication popup was canceled.");
                    } else {
                        console.error(e);
                    }
                });
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                userInfo(user)
                navigate("/home")
                console.log(userName);
            }
        },
            (error) => {
                console.log(error)
            }
        )
    }, [])
    return (
        <Box>
            {/* {userName && navigate("/home")} */}
            <Container maxWidth={"xl"}>
                <Stack className='nav__bar'>
                    <NavLink><img src={loginLogo} alt="" /></NavLink>
                    <Stack className='nav__btn'>
                        <Button>Join now</Button>
                        <Button variant='outlined'>Sign in</Button>
                    </Stack>
                </Stack>
                <Stack component={"section"} className='login__section' alignItems={["center", "center", "start"]}>
                    <Stack className='hero__section'>
                        <Typography variant='h1' sx={{
                            fontSize: { xs: "20px", md: "56px" },
                            width: { xs: "100%", md: "55%" },
                            lineHeight: { xs: 2, md: "70px" },
                            textAlign: { xs: "center", md: "left" },
                            // border: "1px solid red"
                        }}>Welcome to your professional community</Typography>
                        <Box component={"img"}
                            sx={{
                                height: { xs: "400px", md: "670px" },
                                position: { xs: "initial", md: "absolute" },
                                top: { xs: "230px", md: "30px" },
                                objectFit: "contain"
                            }}
                            src={hero} />
                    </Stack>
                    <Box component={"form"} action="submit"
                        sx={{
                            width: "408px",
                            mt: { xs: "20px", md: "80px" },
                            justifyContent: "center"
                        }}>
                        <Button onClick={handleAuth}><Box component={"img"} src={google} alt="" /> Sign in with Google</Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default Login