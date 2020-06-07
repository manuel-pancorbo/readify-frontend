import React, {useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {fade, makeStyles} from "@material-ui/core/styles";
import TagsFilter from "./TagsFilter";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    search: {
        display: "flex", borderRadius: theme.shape.borderRadius, backgroundColor: fade(theme.palette.common.white, 0.15), '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        }, marginRight: theme.spacing(2), marginLeft: 0, [theme.breakpoints.up('xs')]: {
            width: "100%"
        }, [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3), width: '60%',
        },
    }, selectedTag: {
        display: "flex", marginLeft: "10px", width: "auto", ul: {
            listStyleType: "none"
        }
    }, searchIcon: {
        padding: theme.spacing(0, 2), display: 'flex', alignItems: 'center', justifyContent: 'center',
    }, inputRoot: {
        color: 'inherit', display: "flex", width: "75%"
    }, inputInput: {
        padding: theme.spacing(1, 1, 1, 0), // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            paddingLeft: 0,
        }
    }, divider: {
        height: 28, margin: 4,
    }
}));

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(window.location.search).get("search"));

    const classes = useStyles();

    function getSelectedTags() {
        let tags = new URLSearchParams(window.location.search).get("tags");
        if (tags === null) return [];
        return tags.split(",")
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            return applyTextSearch()
        }
    }

    function searchInputChanged(event) {
        setSearchTerm(event.target.value)
    }

    function applyTextSearch() {
        let urlSearchParams = new URLSearchParams(window.location.search);
        if (searchTerm === "" || searchTerm === null) urlSearchParams.delete("search"); else urlSearchParams.set("search", searchTerm);
        window.location.href = "/?" + urlSearchParams.toString()
    }

    return (<div className={classes.search}>
        <InputBase
            placeholder="Buscar"
            classes={{
                root: classes.inputRoot, input: classes.inputInput,
            }}
            defaultValue={searchTerm}
            fullWidth={true}
            inputProps={{'aria-label': 'search'}}
            onKeyPress={handleKeyPress}
            onChange={searchInputChanged}
        />
        <IconButton onClick={() => {
            applyTextSearch()
        }} className={classes.searchIcon} aria-label="search">
            <SearchIcon/>
        </IconButton>
        <Divider className={classes.divider} orientation="vertical"/>
        <div className={classes.selectedTag}>
            {getSelectedTags().map((value) => (<TagsFilter key={value} value={value}/>))}
        </div>
    </div>)
};

export default SearchBar