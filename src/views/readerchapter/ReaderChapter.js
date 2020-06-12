import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";
import {GetReaderBookChapterUseCase} from "../../usecases/getreaderbookchapter/GetReaderBookChapterUseCase";
import ReactMarkdown from "react-markdown";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Brightness4SharpIcon from '@material-ui/icons/Brightness4Sharp';
import Brightness7RoundedIcon from '@material-ui/icons/Brightness7Rounded';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';
import ZoomOutRoundedIcon from '@material-ui/icons/ZoomOutRounded';
import {GetReaderBookUseCase} from "../../usecases/getreaderbook/GetReaderBookUseCase";
import Skeleton from "@material-ui/lab/Skeleton";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
    '@global': {
        a: {
            color: theme.palette.text.primary, fontWeight: "bold",
        },
    }, heroContent: {
        padding: theme.spacing(8, 0, 6),
    }, loginContainer: {
        marginTop: '40px', display: "flex"
    }, MuiButtonRoot: {
        width: '40%', marginLeft: "auto", marginRight: "auto"
    }, readerConfiguration: {
        margin: 0, bottom: 'auto', right: 40, top: 80, left: 'auto', position: 'fixed'
    }, themePicker: {
        marginRight: theme.spacing(2)
    }, chapterContent: {
        margin: theme.spacing(2, 2)
    }, breadcrumbs: {
        marginBottom: theme.spacing(4),
        marginLeft: theme.spacing(4)
    }
}));

const ReaderChapter = ({bookId, chapterId, onDarkModeEnabled, onLightModeEnabled, currentTheme}) => {
    const classes = useStyles();
    const [chapter, setChapter] = useState(null);
    const [book, setBook] = useState(null);
    const [fontSize, setFontSize] = useState(100)

    const handleThemeChange = (event, newTheme) => {
        if (newTheme === 'light') {
            onLightModeEnabled()
        } else {
            onDarkModeEnabled()
        }
    };

    const handleFontSizeChange = (event, selectedToggle) => {
        if (selectedToggle[0] === 'zoom-in') {
            setFontSize(fontSize + 20)
        } else {
            setFontSize(fontSize - 20)
        }
    };

    useEffect(() => {
        Promise.all([new GetReaderBookChapterUseCase(new AuthenticatedUserRepository()).execute(bookId, chapterId), new GetReaderBookUseCase(new AuthenticatedUserRepository()).execute(bookId)])
            .then(([chapter, book]) => {
                setChapter(chapter)
                setBook(book)
            })
            .catch((error) => console.error(error))
    }, []);

    return <Container maxWidth="md" component="main" className={classes.heroContent}>
        {!chapter || !book ? <ChapterSkeleton/> : <React.Fragment><Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Link color="inherit" href={`/my-books`}>
                Mis libros
            </Link>
            <Link color="inherit" href={`/books/${bookId}`}>
                {book.title}
            </Link>
            <Typography color="textPrimary">Chapter {chapter.order}</Typography>
        </Breadcrumbs>
        <Grid container justify={"center"}>
            <Typography component="h1" variant="h6" align="center" color="textPrimary" gutterBottom>
                {book.title}
            </Typography>
            <Typography component={"h1"} variant="h2" align="center" color="textPrimary" gutterBottom>
                Capítulo {chapter.order}. {chapter.title}
            </Typography>
            <Grid item xs={12} style={{fontSize: fontSize + "%"}} className={classes.chapterContent}>
                <ReactMarkdown source={chapter.content}/>
            </Grid>
        </Grid></React.Fragment>}
        <div className={classes.readerConfiguration}>
            <ToggleButtonGroup
                aria-label="theme mode"
                exclusive
                onChange={handleThemeChange}
                value={currentTheme}
                className={classes.themePicker}
            >
                <ToggleButton value="dark" aria-label="left aligned">
                    <Brightness4SharpIcon/>
                </ToggleButton>
                <ToggleButton value="light" aria-label="centered">
                    <Brightness7RoundedIcon/>
                </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
                aria-label="font size"
                onChange={handleFontSizeChange}
            >
                <ToggleButton value="zoom-in" aria-label="left aligned">
                    <ZoomInRoundedIcon/>
                </ToggleButton>
                <ToggleButton value="zoom-out" aria-label="centered">
                    <ZoomOutRoundedIcon/>
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    </Container>
}

export default ReaderChapter

const ChapterSkeleton = () => {

    return <Grid container justify={"center"}>
        <Skeleton variant={"text"} height={30} width={"50%"}/>
        <Skeleton variant={"text"} height={50} width={"100%"}/>
        {[...Array(20).keys()].map(value => <Skeleton key={value} height={"30px"} width={"100%"} variant={"text"}/>)}
    </Grid>
}