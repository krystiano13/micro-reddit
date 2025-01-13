import { Head, router } from '@inertiajs/react'
import { Navigation } from "../components/Navigation.tsx";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { createEditor } from 'slate'
import { withReact } from 'slate-react'
import type { BaseEditor } from 'slate'
import type { ReactEditor } from 'slate-react'

import { Editor } from "../components/Editor.tsx";

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

export default function Edit({ user, post }: { user: any }) {
    const [editor] = useState(() => withReact(createEditor()))
    const [title, setTitle] = useState<string>(post.title ? post.title : "");

    useEffect(() => {
        if(post.body) {
            editor.children = JSON.parse(post.body);
        }
    }, []);

    async function updatePost(e: FormEvent) {
        e.preventDefault();
        router.patch(`/post/${post.id}`, {
            title: title,
            body: JSON.stringify(editor.children)
        })
    }

    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE - Create new Post" />
            <Editor
                editor={editor}
                title={title}
                setTitle={(value:string) => setTitle(value)}
                submit={(e) => updatePost(e)}
            />
        </Navigation>
    )
}
