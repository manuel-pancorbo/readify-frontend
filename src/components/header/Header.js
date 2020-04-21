import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import {Link} from "@material-ui/core";
import SearchBar from "./SearchBar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from '@material-ui/icons/Search';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {useAuth} from "../../context/auth";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    }, menuButton: {
        marginRight: theme.spacing(2),
    }, title: {
        display: 'none', textDecoration: "none", cursor: "pointer", "&:hover": {
            textDecoration: "none"
        }, [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }, sectionDesktop: {
        display: 'none', [theme.breakpoints.up('md')]: {
            display: 'flex', marginLeft: "auto"
        },
    }, sectionMobile: {
        display: 'flex', marginLeft: 'auto', [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    }, list: {
        width: 250,
    }, avatar: {
        backgroundColor: theme.palette.secondary.main, width: theme.spacing(12), height: theme.spacing(12), margin: "auto"
    }, menuHeader: {
        marginTop: '20px', marginBottom: '20px',
    }, menuSubtitle: {
        marginTop: '15px', display: "flex", justifyContent: "center",
    }
}));

const Header = () => {
    const classes = useStyles();
    const [isDrawerOpened, setIsDrawerOpened] = React.useState(false);
    const isUserAuthenticated = useAuth()

    return (<div className={classes.grow}>
        <AppBar position="static" color={"inherit"}>
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    onClick={() => {
                        setIsDrawerOpened(true)
                    }}
                    aria-label="open drawer"
                >
                    <MenuIcon/>
                </IconButton>
                <Link href={"/"} className={classes.title} variant="h6" color="inherit">
                    Readify
                </Link>
                <SearchBar/>
            </Toolbar>
        </AppBar>
        <Drawer anchor={"left"} open={isDrawerOpened} onClose={() => { setIsDrawerOpened(false) }}>
            <MenuHeader/>
            <Divider/>
            { isUserAuthenticated ? <UserAuthenticatedMenu/> : <AnonymousUserMenu/> }
        </Drawer>
    </div>);
}

const MenuHeader = () => {
    const useStyles = makeStyles(theme => ({
        avatar: {
            backgroundColor: theme.palette.secondary.main, width: theme.spacing(12), height: theme.spacing(12), margin: "auto"
        }, menuHeader: {
            marginTop: '20px', marginBottom: '20px',
        }, menuSubtitle: {
            marginTop: '15px', display: "flex", justifyContent: "center",
        }
    }));
    const classes = useStyles()

    return (
        <div className={classes.menuHeader}>
            <Avatar className={classes.avatar}>MP</Avatar>
            <div className={classes.menuSubtitle}>
                <Typography style={{fontSize: 1 + 'rem'}} variant={"subtitle2"} component={"span"}> manuel.pancorbo </Typography>
            </div>
        </div>
    )
}

const UserAuthenticatedMenu = () => {
    return (
        <div style={{width: '250px'}}>
            <List>
                <ListItem onClick={() => { window.location.href = "/" }} button>
                    <ListItemIcon><SearchIcon/></ListItemIcon>
                    <ListItemText primary={"Explore"}/>
                </ListItem>
                <ListItem onClick={() => { window.location.href = "/my-books" }} button>
                    <ListItemIcon><MenuBookIcon/></ListItemIcon>
                    <ListItemText primary={"My books"}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem onClick={() => { window.location.href = "/logout" }} button>
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText primary={"Logout"}/>
                </ListItem>
            </List>
        </div>
    )
}

const AnonymousUserMenu = () => {
    return (
        <div style={{width: '250px'}}>
            <List>
                <ListItem onClick={() => { window.location.href = "/" }} button>
                    <ListItemIcon><SearchIcon/></ListItemIcon>
                    <ListItemText primary={"Explore"}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem onClick={() => { window.location.href = "/sign-up" }} button>
                    <ListItemIcon><KeyboardTabIcon/></ListItemIcon>
                    <ListItemText primary={"Sign up"}/>
                </ListItem>
                <ListItem onClick={() => { window.location.href = "/login" }} button>
                    <ListItemIcon><LockOpenIcon/></ListItemIcon>
                    <ListItemText primary={"Login"}/>
                </ListItem>
            </List>
        </div>
    )
}

export default Header