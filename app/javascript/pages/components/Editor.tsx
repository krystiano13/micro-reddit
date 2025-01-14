import styled from 'styled-components';
import { Button, Card, Input } from "@mantine/core";
import { Slate } from "slate-react";
import TextEditor from "./TextEditor.tsx";
import type { FormEvent } from "react";

const EditorWrapper = styled.div`
    width: 100%;
    height: calc(95vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

interface Props {
    editor: any,
    submit: (e: FormEvent) => void,
    title: string,
    setTitle: (value:string) => void
    errors: string[]
}

export function Editor({ editor, submit, title, setTitle, errors }: Props) {
    return (
        <EditorWrapper>
            <Card style={{ padding: "2rem" }}>
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <Input
                        value={title}
                        required
                        type="text"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Slate editor={editor} initialValue={initialValue}>
                        <TextEditor readOnly={false} editor={editor} />
                    </Slate>
                    <Button
                        type="submit"
                    >
                        Submit
                    </Button>
                    {
                        errors && errors.map(item => (
                            <p className="error">{ item }</p>
                        ))
                    }
                </form>
            </Card>
        </EditorWrapper>
    )
}