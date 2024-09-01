import { Avatar, Box, Button, CardContent, CardMedia, Drawer, IconButton, Input, Stack, Typography } from '@mui/material'
import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import { HiOutlinePhoto } from "react-icons/hi2";
import { IoLogoYoutube } from "react-icons/io";
import { BsChatText } from "react-icons/bs";
import TextArea from 'antd/es/input/TextArea';
import ReactPlayer from 'react-player';


const PostModal = ({ isOpen, handleClose, editorText, setEditorText, handleImgChange, shareVideo, setShareVideo, reset, postArticle, shareImage, assetArea, handlePicAsset, handleVideoAsset, userName, userPhoto, user }) => {
    // .then((snapshot) => {
    //     getDownloadURL(snapshot.ref).then((url) => {
    //         console.log(url);

    //     })
    // })

    return (
        <Stack >
            <Drawer
                open={isOpen}
                anchor='top'
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        background: "#fff",
                        borderRadius: "5px",
                        top: "32px",
                        m: "auto",
                        maxHeight: "90%",
                        maxWidth: "552px",
                        width: "100%",
                        textAlign: "center",
                    }
                }}
            >
                <CardContent className='post__header'>
                    <Stack>
                        <Typography variant='h6'>Create a post</Typography>
                        <IconButton onClick={handleClose}>
                            <RxCross1 />
                        </IconButton>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack className='post__user'>
                        <Avatar src={userPhoto} />
                        <Typography variant='h6'>{userName}</Typography>
                    </Stack>
                </CardContent>
                <CardContent>
                    <TextArea
                        value={editorText}
                        onChange={setEditorText}
                        placeholder='What do you want to talk about?'
                        autoFocus={true}
                        className='post__input'
                    />
                    <Stack className='post__upload'>
                        {assetArea === "image" ? (
                            <>
                                <Input
                                    type='file'
                                    accept="image/gif, image/jpeg, image/png, image/jfif"
                                    name='image'
                                    id='file'
                                    onChange={handleImgChange}
                                    sx={{ display: 'none' }}
                                />
                                <Box component={"label"} htmlFor="file">Select an image to share</Box>
                                {shareImage && <CardMedia component={"img"} src={URL.createObjectURL(shareImage)}
                                    sx={{
                                        maxHeight: "50vh",
                                        objectFit: "contain"
                                    }} />}
                            </>

                        ) : assetArea === "video" ? (
                            <Stack>
                                <Input
                                    type='text'
                                    placeholder='Please enter a video link'
                                    value={shareVideo}
                                    onChange={setShareVideo}
                                />
                                {shareVideo && <ReactPlayer width={"100%"} url={shareVideo} />}
                            </Stack>
                        ) : ("")

                        }
                    </Stack>
                </CardContent>
                <CardContent className='post__buttons'>
                    <Stack className='post__creation'>
                        <Stack direction={"row"}>
                            <Button variant='outlined' onClick={handlePicAsset}><HiOutlinePhoto size={"1.5rem"} /></Button>
                            <Button variant='outlined' onClick={handleVideoAsset}><IoLogoYoutube size={"1.5rem"} /></Button>
                        </Stack>
                        <Button variant='outlined'><BsChatText />Anyone</Button>
                    </Stack>
                    <Button variant='contained' disabled={!editorText && !shareImage && !shareVideo ? true : false} onClick={postArticle}>Post</Button>
                </CardContent>
            </Drawer>
        </Stack >
    )
}

export default PostModal
