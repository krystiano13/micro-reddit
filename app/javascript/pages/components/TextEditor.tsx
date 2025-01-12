import { useCallback } from "react";
import { Editor, Transforms, Text } from "slate";
import { Editable } from "slate-react";
import { useState } from "react";

import { IconButton } from "@mui/material";
import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
} from "@mui/icons-material";

const Leaf = (props) => {
    return (
        <span
            {...props.attributes}
            style={{
                fontWeight: props.leaf.bold ? "bold" : "normal",
                fontStyle: props.leaf.italic ? "italic" : "normal",
                textDecoration: props.leaf.underline ? "underline" : "none"
            }}
        >
      {props.children}
    </span>
    );
};

function TextEditor({ editor }) {
    const [bold, setBold] = useState<boolean>(false);
    const [italic, setItalic] = useState<boolean>(false);
    const [underline, setUnderline] = useState<boolean>(false);

    function changeMark(mark) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n[mark]
        });

        Transforms.setNodes(
            editor,
            { [mark]: !match },
            { match: (n) => Text.isText(n), split: true }
        );
    }

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    const onKeyDown = (event) => {
        if (!event.ctrlKey) {
            return;
        }

        switch (event.key) {
            case "b": {
                changeMark("bold");
                break;
            }

            case "i": {
                changeMark("italic");
                break;
            }

            case "u": {
                changeMark("underline");
                break;
            }
            default: {
                break;
            }
        }
    };
    return (
        <div
            style={{
                backgroundColor: "#171718",
                color: "#fff",
                textAlign: "start",
                padding: "10px",
                width: "30rem",
                height: "40rem"
            }}
        >
            <div style={{display: `flex`, backgroundColor: "#1f1f1f", marginBottom: "1rem", padding: ".5rem", gap: ".5rem"}}>
                <IconButton
                    style={{ color: bold ? "white" : "grey", backgroundColor: bold ? "rgb(37, 116, 189)" : "transparent" }}
                    onPointerDown={(e) => {
                        changeMark("bold");
                        setBold(prev => !prev);
                    }}
                >
                    <FormatBold />
                </IconButton>
                <IconButton
                    style={{ color: italic ? "white" : "grey", backgroundColor: italic ? "rgb(37, 116, 189)" : "transparent" }}
                    onPointerDown={(e) => {
                        changeMark("italic");
                        setItalic(prev => !prev);
                    }}
                >
                    <FormatItalic />
                </IconButton>
                <IconButton
                    style={{ color: underline ? "white" : "grey", backgroundColor: underline ? "rgb(37, 116, 189)" : "transparent" }}
                    onPointerDown={(e) => {
                        changeMark("underline");
                        setUnderline(prev => !prev);
                    }}
                >
                    <FormatUnderlined />
                </IconButton>
            </div>
            <Editable
                style={{ outline: "none", height: "90%", overflowY: "auto" }}
                onKeyDown={onKeyDown}
                renderLeaf={renderLeaf}
            />
        </div>
    )}
export default TextEditor;