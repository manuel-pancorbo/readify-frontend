import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";

const
    ChapterContentField = ({content, onChange}) => {
    const mdParser = new MarkdownIt();

    return <MdEditor
        value={content}
        style={{minHeight: "700px", width: "100%"}}
        renderHTML={(text) => mdParser.render(text)}
        onChange={onChange}
    />
}

export default ChapterContentField