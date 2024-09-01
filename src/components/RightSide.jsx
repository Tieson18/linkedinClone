import { Avatar, Box, Button, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import feed from "../assets/feed-icon.svg"
import rightArrow from "../assets/right-icon.svg"
import AdChoice from "../assets/AdChoice.png"

const RightSide = () => {
    const feedList = ["#linkedin", "#Video",]

    return (
        <Grid item xs={12} md={2.5}>
            <Stack spacing={1} className='left__container'>
                <Card>
                    <CardContent>
                        <Stack className='right__head' mb={1}>
                            <Typography variant='h6'>Add to your feed</Typography>
                            <Box component={"img"} src={feed} alt=" " />
                        </Stack>
                        <Stack spacing={1} className='right__content'>
                            {feedList.map((feed, index) => (
                                <Stack key={index} direction={"row"} spacing={3}>
                                    <Link><Avatar /></Link>
                                    <Stack alignItems={"center"}>
                                        <Typography variant='p'>{feed}</Typography>
                                        <Button>Follow</Button>
                                    </Stack>
                                </Stack>
                            ))}
                            <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                <Typography component='span'>View all recommendation</Typography>
                                <Box component={"img"} src={rightArrow} alt="" />
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <CardMedia
                            component="img"
                            image={AdChoice}
                        />
                    </CardContent>
                </Card>
            </Stack>
        </Grid>
    )
}

export default RightSide