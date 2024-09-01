import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import "../Styles/Home.css"
import LeftSide from '../components/LeftSide'
import Main from '../components/Main'
import RightSide from '../components/RightSide'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Database/firebase'
import { useSelector } from 'react-redux'

const Home = () => {
    const navigate = useNavigate()

    const userPhoto = useSelector((Store) => {
        return Store.userStore.user.photo
    })
    const userName = useSelector((Store) => {
        return Store.userStore.user.name;
    })

    const userID = useSelector((store) => {
        return store.userStore.user.uid
    })
    const user = useSelector((store) => {
        return store.userStore.user;
    })

    const postLoading = useSelector((store) => {
        return store.articleStore.loading;
    });
    console.log(postLoading);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/")
            }
        });
    }, [])
    return (
        <>
            <Header
                userID={userID}
                userPhoto={userPhoto}
            />
            <Box component={"section"} pt={8} mb={6}>
                <Container maxWidth={"xl"} >
                    <Stack className='home__section' direction={["column", "row"]} p={["0 5px", "16 px 0"]}>
                        <Link>Hiring in a hurry? - </Link>
                        <Typography variant='p' fontSize={"14px"} color={"#434649"} fontWeight={600}>find talented pros in record time with upwork and keep business moving.</Typography>
                    </Stack>
                    <Stack m={"25px 0"}>
                        <Grid container gap={3} justifyContent={"center"}>
                            <LeftSide />
                            <Main
                                userName={userName}
                                userPhoto={userPhoto}
                                user={user}
                                loading={postLoading}
                            />
                            <RightSide />
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default Home