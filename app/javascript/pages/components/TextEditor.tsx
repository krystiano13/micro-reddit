import { useCallback } from "react";
import { Editor, Transforms, Text } from "slate";
import { Editable } from "slate-react";

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
                textDecoration: props.leaf.underline ? "underline" : "none",
                fontSize: props.leaf.h1 ? "1.75rem" : props.leaf.h2 ? "1.4rem" : "1rem"
            }}
        >
      {props.children}
    </span>
    );
};

function TextEditor({ editor }) {
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

            case "h": {
                changeMark("h1");
                break;
            }

            case "f": {
                changeMark("h1");
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
            <div style={{display: `flex`, backgroundColor: "#1f1f1f", marginBottom: "1rem"}}>
                <IconButton
                    style={{ color: "grey" }}
                    onPointerDown={(e) => {
                        changeMark("h1");
                    }}
                >
                    <span style={{ fontSize: "1rem" }}>H1</span>
                </IconButton>
                <IconButton
                    style={{ color: "grey" }}
                    onPointerDown={(e) => {
                        changeMark("h2");
                    }}
                >
                    <span style={{ fontSize: "1rem" }}>H2</span>
                </IconButton>
                <IconButton
                    style={{ color: "grey" }}
                    onPointerDown={(e) => {
                        changeMark("bold");
                    }}
                >
                    <FormatBold />
                </IconButton>
                <IconButton
                    style={{ color: "grey" }}
                    onPointerDown={(e) => {
                        changeMark("italic");
                    }}
                >
                    <FormatItalic />
                </IconButton>
                <IconButton
                    style={{ color: "grey" }}
                    onPointerDown={(e) => {
                        changeMark("underline");
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