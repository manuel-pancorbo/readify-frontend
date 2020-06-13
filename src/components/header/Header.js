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
import CreateIcon from '@material-ui/icons/Create';
import ReceiptIcon from '@material-ui/icons/Receipt';
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
    const user = useAuth();

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
            { user ? <MenuHeader user={user} /> : <AnonymousMenuHeader/> }
            <Divider/>
            { user ? <UserAuthenticatedMenu/> : <AnonymousUserMenu/> }
        </Drawer>
    </div>);
};

const MenuHeader = ({user}) => {
    const useStyles = makeStyles(theme => ({
        avatar: {
            backgroundColor: theme.palette.secondary.main, width: theme.spacing(12), height: theme.spacing(12), margin: "auto"
        }, menuHeader: {
            marginTop: '20px', marginBottom: '20px',
        }, username: {
            marginTop: '15px', display: "flex", justifyContent: "center", color: theme.palette.primary.main
        }, email: {
            marginTop: '10px', display: "flex", justifyContent: "center",
        }
    }));
    const classes = useStyles();

    const avatar = user.image
        ? <Avatar src={user.image} className={classes.avatar}/>
        : <Avatar className={classes.avatar}>{user.username.charAt(0).toUpperCase()}</Avatar>;

    return (
        <div className={classes.menuHeader}>
            {avatar}
            <div className={classes.username}>
                <Typography style={{fontSize: "1.2rem", fontWeight: 500}} component={"span"} variant={"subtitle2"}> {user.username} </Typography>
            </div>
            <div className={classes.email}>
                <Typography style={{fontSize: "0.8rem"}} component={"span"}> {user.email} </Typography>
            </div>
        </div>
    )
};

const AnonymousMenuHeader = () => {
    const useStyles = makeStyles(theme => ({
        avatar: {
            backgroundColor: theme.palette.secondary.main, width: theme.spacing(12), height: theme.spacing(12), margin: "auto"
        }, menuHeader: {
            marginTop: '20px', marginBottom: '20px',
        }
    }));
    const classes = useStyles();

    return (
        <div className={classes.menuHeader}>
            <Avatar className={classes.avatar}/>
        </div>
    )
};

const UserAuthenticatedMenu = () => {
    return (
        <div style={{width: '250px'}}>
            <List>
                <ListItem onClick={() => { window.location.href = "/" }} button>
                    <ListItemIcon><SearchIcon/></ListItemIcon>
                    <ListItemText primary={"Explorar"}/>
                </ListItem>
                <ListItem onClick={() => { window.location.href = "/my-books" }} button>
                    <ListItemIcon><MenuBookIcon/></ListItemIcon>
                    <ListItemText primary={"Mis libros"}/>
                </ListItem>
                <ListItem onClick={() => { window.location.href = "/my-publications" }} button>
                    <ListItemIcon><CreateIcon/></ListItemIcon>
                    <ListItemText primary={"Mis publicaciones"}/>
                </ListItem>
                <ListItem onClick={() => { window.location.href = "/my-payments" }} button>
                    <ListItemIcon><ReceiptIcon/></ListItemIcon>
                    <ListItemText primary={"Mis pagos"}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem onClick={() => { window.location.href = "/logout" }} button>
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText primary={"Cerrar sesión"}/>
                </ListItem>
            </List>
        </div>
    )
};

const AnonymousUserMenu = () => {
    return (
        <div style={{width: '250px'}}>
            <List>
                <ListItem onClick={() => { window.location.href = "/" }} button>
                    <ListItemIcon><SearchIcon/></ListItemIcon>
                    <ListItemText primary={"Explorar"}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem onClick={() => { window.location.href = "/sign-up" }} button>
                    <ListItemIcon><KeyboardTabIcon/></ListItemIcon>
                    <ListItemText primary={"Registrarse"}/>
                </ListItem>
                <ListItem onClick={() => { window.location.href = "/login" }} button>
                    <ListItemIcon><LockOpenIcon/></ListItemIcon>
                    <ListItemText primary={"Iniciar sesión"}/>
                </ListItem>
            </List>
        </div>
    )
};

export default Header