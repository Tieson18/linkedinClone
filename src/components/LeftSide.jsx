import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import Photo from '../assets/photo.svg'
import CardBack from '../assets/card-bg.svg'
import { Link } from 'react-router-dom'
import widget from '../assets/widget-icon.svg'
import bookmark from '../assets/item-icon.svg'
import plus from '../assets/plus-icon.svg'
import { useSelector } from 'react-redux'

const LeftSide = () => {
    const userName = useSelector((store) => {
        return store.userStore.user.name;
    })


    return (
        <Grid item xs={12} md={2}>
            <Stack spacing={1} className='left__container'>
                <Card>
                    <CardMedia
                        image={CardBack}
                        sx={{
                            height: "70px",
                            width: "100%",
                            objectFit: "cover",
                            // borderRadius: "10px",
                            // padding: "10px"
                        }}
                    />
                    <CardContent className='left__card'>
                        <Stack className='left__photo'>
                            <Box component={"img"} height={"50px"} src={Photo} alt="" />
                        </Stack>
                        <Link>Welcome, {userName}!</Link>
                        <Link>Add a photo</Link>
                    </CardContent>
                    <Box className='left__widget1'>
                        <Button>
                            <Stack>
                                <Typography variant='span'>Connections</Typography>
                                <Typography variant='span'>Grow your network</Typography>
                            </Stack>
                            <Box component={"img"} src={widget} alt="" />
                        </Button>
                    </Box>
                    <Box className='left__widget2'>
                        <Button>
                            <Stack direction={"row"}>
                                <Box component={"img"} src={bookmark} alt="" />
                                <Typography variant='span'>My items</Typography>
                            </Stack>
                        </Button>
                    </Box>
                </Card>
                <Card>
                    <CardContent>
                        <Stack className='left__widget3' spacing={1}>
                            <Link>Groups</Link>
                            <Link>
                                Events
                                <img src={plus} alt="" />
                            </Link>
                            <Link>Follow Hashtags</Link>
                        </Stack>
                    </CardContent>
                    <Box className="left__widget2">
                        <Button>
                            <Link>Discover more</Link>
                        </Button>
                    </Box>
                </Card>
            </Stack>
        </Grid>
    )
}

export default LeftSide