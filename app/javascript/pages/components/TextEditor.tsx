import {useCallback, useEffect} from "react";
import {Editor, Transforms, Text} from "slate";
import {Editable} from "slate-react";

import {IconButton} from "@mui/material";
import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
} from "@mui/icons-material";

interface LeafProps {
    readOnly?: boolean
}

const Leaf = (props) => {
    console.log(props);
    return (
        <span
            {...props.attributes}
            style={props.readOnly ? {
                fontWeight: props.leaf.bold ? "bold" : "normal",
                fontStyle: props.leaf.italic ? "italic" : "normal",
                textDecoration: props.leaf.underline ? "underline" : "none",
                fontSize: props.leaf.h1 ? "2rem" : props.leaf.h2 ? "1.75rem" : "1.6rem"
            } : {
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

function TextEditor({editor, readOnly}) {
    function changeMark(mark) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n[mark]
        });

        Transforms.setNodes(
            editor,
            {[mark]: !match},
            {match: (n) => Text.isText(n), split: true}
        );
    }

    const renderLeaf = useCallback((props) => {
        return <Leaf readOnly={readOnly} {...props} />;
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

    useEffect(() => {
        if(readOnly) {
            changeMark("readOnly")
        }
    },[]);

    return (
        <div
            style={{
                color: "#fff",
                textAlign: "start",
                padding: readOnly ? "0px" : "10px",
                marginTop: readOnly ? "1rem" : "0rem",
                width: readOnly ? "100%" : "30rem",
                height: readOnly ? "auto" : "35rem",
                backgroundColor: 'rgb(46, 46, 46)',
                border: readOnly ? 'none' : '1px solid #424242',
                borderRadius: '4px'
            }}
        >
            {
                !readOnly &&
                <div style={{
                    display: `flex`,
                    backgroundColor: 'rgb(46, 46, 46)',
                    border: '1px solid #424242',
                    borderRadius: '4px',
                    marginBottom: "1rem"
                }}>
                    <IconButton
                        style={{color: "grey"}}
                        onPointerDown={(e) => {
                            changeMark("bold");
                        }}
                    >
                        <FormatBold/>
                    </IconButton>
                    <IconButton
                        style={{color: "grey"}}
                        onPointerDown={(e) => {
                            changeMark("italic");
                        }}
                    >
                        <FormatItalic/>
                    </IconButton>
                    <IconButton
                        style={{color: "grey"}}
                        onPointerDown={(e) => {
                            changeMark("underline");
                        }}
                    >
                        <FormatUnderlined/>
                    </IconButton>
                    <IconButton
                        style={{color: "grey"}}
                        onPointerDown={(e) => {
                            changeMark("h1");
                        }}
                    >
                        <b style={{fontSize: "1rem"}}>H1</b>
                    </IconButton>
                    <IconButton
                        style={{color: "grey"}}
                        onPointerDown={(e) => {
                            changeMark("h2");
                        }}
                    >
                        <b style={{fontSize: "1rem"}}>H2</b>
                    </IconButton>
                </div>
            }
            <Editable
                readOnly={readOnly}
                style={{outline: "none", height: "90%", overflowY: "auto"}}
                onKeyDown={onKeyDown}
                renderLeaf={renderLeaf}
            />
        </div>
    )
}

export default TextEditor;