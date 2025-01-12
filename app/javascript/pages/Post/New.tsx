import { Head } from '@inertiajs/react'
import { Navigation } from "../components/Navigation.tsx";
import { useState } from "react";
import styled from "styled-components";
import { Card, Input, Button } from "@mantine/core";

import TextEditor from "../components/TextEditor.tsx";
import { createEditor } from 'slate'
import { Slate, withReact } from 'slate-react'
import type { BaseEditor } from 'slate'
import type { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

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

export default function Home({ user }: { user: any }) {
    const [editor] = useState(() => withReact(createEditor()))

    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE - Create new Post" />
            <EditorWrapper>
                <Card style={{ padding: "2rem" }}>
                    <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <Input required type="text" placeholder="Title" />
                        <Slate editor={editor} initialValue={initialValue}>
                            <TextEditor editor={editor} />
                        </Slate>
                        <Button
                            type="submit"
                        >Create Post</Button>
                    </form>
                </Card>
            </EditorWrapper>
        </Navigation>
    )
}
