import { Avatar, Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import article from "../assets/article-icon.svg"
import video from "../assets/video-icon.svg"
import photo from "../assets/photo-icon.svg"
import photo2 from "../assets/photo-icon2.svg"
import thumbs from "../assets/thumbs.svg"
import clap from "../assets/clap.svg"
import like from "../assets/like.svg"
import sharedImg from "../assets/shared.png"
import { Link } from 'react-router-dom'
import { MoreHoriz } from '@mui/icons-material'
import { IoIosSend } from "react-icons/io";
import { LiaShareSolid } from "react-icons/lia";
import { BsChatRightText } from "react-icons/bs";
import PostModal from './PostModal'
import db, { storage } from '../Database/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { setArticle, setLoading } from '../store/slice/articleSlice'
import ReactPlayer from 'react-player'


const Main = ({ userName, userPhoto, user, loading }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [editorText, setEditorText] = useState("")
    const [shareImage, setShareImage] = useState("")
    const [shareVideo, setShareVideo] = useState("")
    const [assetArea, setAssetArea] = useState("")

    const dispatch = useDispatch()

    const articleStore = useSelector((store) => {
        return store.articleStore.articles
    })


    const handleImgChange = (e) => {
        const image = e.target.files[0]
        if (image === '' || image === undefined) {
            alert(`not an image, the file is ${typeof image}`)
            return
        }
        setShareImage(image)
    }

    const handleAssetChange = (area) => {
        setShareVideo("")
        setShareImage("")
        setAssetArea(area)
    }

    const postApi = (article) => {
        dispatch(setLoading(true))

        if (article.image) { // Check if shareImage is not null or undefined
            const uploadRef = ref(storage, `images/${shareImage.name}`);
            const uploadTask = uploadBytesResumable(uploadRef, shareImage);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progress: ${progress}%`);
                    if (snapshot.state === "running") {
                        console.log(`Progress: ${progress}%`);
                    }
                },
                (error) => console.log("ERROR:", error.code),
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        const colRef = collection(db, "articles");
                        await setDoc(doc(colRef), {
                            actor: {
                                description: article.user.email,
                                title: article.user.name,
                                date: article.timestamp,
                                image: article.user.photo
                            },
                            video: shareVideo,
                            shareImage: downloadURL,
                            comment: 0,
                            description: editorText,
                        });
                        dispatch(setLoading(false))
                        console.log("Article posted successfully");
                    } catch (error) {
                        console.error("Error posting article: ", error);
                    }
                }
            );
        } else if (article.video) {
            const colRef = collection(db, "articles");
            setDoc(doc(colRef), {
                actor: {
                    description: article.user.email,
                    title: article.user.name,
                    date: article.timestamp,
                    image: article.user.photo
                },
                video: shareVideo,
                shareImage: "",
                comment: 0,
                description: editorText,
            });
            dispatch(setLoading(false))
        }
    };


    const postArticle = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return
        }

        const article = {
            user: user,
            video: shareVideo,
            image: shareImage,
            description: editorText,
            timestamp: serverTimestamp()
        }

        console.log(article);


        postApi(article)

        reset(e)
    }


    const reset = () => {
        setIsDrawerOpen(false);
        setEditorText("")
        setShareVideo("")
        setShareImage("")
        setAssetArea("")
    }

    const iconList = [
        {
            icon: photo,
            text: "Photo",
        },
        {
            icon: video,
            text: "Video",
        },
        {
            icon: photo2,
            text: "Event",
        },
        {
            icon: article,
            text: "Write article",
        },
    ]

    const feedIcons = [
        {
            icon: <Box component={"img"} src={like} />,
            text: "Like",
        },
        {
            icon: <BsChatRightText size={"18px"} />,
            text: "Comments",
        },
        {
            icon: <LiaShareSolid size={"20px"} />,
            text: "Share",
        },
        {
            icon: <IoIosSend size={"20px"} />,
            text: "Send",
        },
    ]

    const colRef = collection(db, "articles");

    const q = query(colRef, orderBy("actor.date", "desc"))

    // to retrive data from firebase
    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc) => doc.data());
            dispatch(setArticle(articles));
            console.log(articleStore);
        })
    }, [])

    return (
        <Grid item xs={12} md={6}>
            <Stack spacing={1} className='main__container'>
                <Card>
                    <CardContent>
                        <Stack spacing={2}>
                            <Stack className='main__header'>
                                <Avatar src={userPhoto} />
                                <Button onClick={() => setIsDrawerOpen(true)} disabled={loading ? true : false}>Start a post</Button>
                            </Stack>
                            <Stack className='main__buttons'>
                                {iconList.map((icon, index) => (
                                    <Button key={index} direction={"row"}>
                                        <Box component={"img"} src={icon.icon} height={[15, 20]} />
                                        <Typography sx={{ fontSize: { xs: 12, md: 14 } }}>{icon.text}</Typography>
                                    </Button>
                                ))}
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
                {loading &&
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box>}
                {articleStore.length === 0 ? <Typography>There are no articles</Typography> :
                    (<Card>
                        {articleStore.map((article, i) => (
                            <Stack key={i}>
                                <CardContent sx={{ position: "relative" }}>
                                    <Stack className='main__actor'>
                                        <Link>
                                            <Avatar src={article.actor.image} variant='square' sx={{ width: "48px", height: "48px" }} />
                                            <Stack>
                                                <Typography component={"span"}>{article.actor.title}</Typography>
                                                <Typography component={"span"}>{article.actor.description}</Typography>
                                                <Typography component={"span"}>{article.actor.date.toDate().toLocaleDateString()}</Typography>
                                            </Stack>
                                        </Link>
                                        <IconButton>
                                            <MoreHoriz />
                                        </IconButton>
                                        <Typography variant='h6'>{article.description}</Typography>
                                    </Stack>
                                </CardContent>
                                {article.video ?
                                    (
                                        <ReactPlayer width={"100%"} url={article.video} />
                                    ) : (
                                        article.shareImage &&
                                        <Link to={article.shareImage}>
                                            <CardMedia
                                                component='img'
                                                image={article.shareImage}
                                                sx={{ maxHeight: "100vh", objectFit: "contain" }}
                                            />
                                        </Link>
                                    )
                                }
                                <CardContent>
                                    <Stack className='main__post'>
                                        <Button>
                                            <img src={thumbs} alt="" />
                                            <img src={clap} alt="" />
                                            75
                                        </Button>
                                        <Link>{article.comment}</Link>
                                    </Stack>
                                    <Stack className='social__action'>
                                        {feedIcons.map((feed, i) => (
                                            <Button key={i}>
                                                {feed.icon}
                                                <Typography display={["none", "block"]}>{feed.text}</Typography>
                                            </Button>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Stack>
                        ))}
                    </Card>
                    )
                }
                <PostModal
                    isOpen={isDrawerOpen}
                    handleClose={reset}
                    editorText={editorText}
                    setEditorText={(e) => setEditorText(e.target.value)}
                    handleImgChange={handleImgChange}
                    shareVideo={shareVideo}
                    setShareVideo={(e) => setShareVideo(e.target.value)}
                    shareImage={shareImage}
                    assetArea={assetArea}
                    setAssetArea={setAssetArea}
                    handlePicAsset={() => handleAssetChange("image")}
                    handleVideoAsset={() => handleAssetChange("video")}
                    userName={userName}
                    userPhoto={userPhoto}
                    postArticle={(e) => postArticle(e)}
                />
            </Stack>
        </Grid>
    )
}

export default Main