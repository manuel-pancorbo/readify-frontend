import Chip from "@material-ui/core/Chip";
import React from "react";

const TagsFilter = ({value}) => {
    function handleDelete() {
        let urlSearchParams = new URLSearchParams(window.location.search);
        let remainingTags = urlSearchParams.get("tags").split(",").filter((it) => {return it !== value})

        if (remainingTags.length === 0)
            urlSearchParams.delete("tags")
        else
            urlSearchParams.set("tags", remainingTags.join(","))

        window.location.href= "/?" + urlSearchParams.toString()
    }

    return (<Chip label={value} onDelete={handleDelete} color="primary" />)
}

export default TagsFilter