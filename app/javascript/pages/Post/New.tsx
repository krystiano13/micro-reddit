import { Head, router } from '@inertiajs/react'
import { Navigation } from "../components/Navigation.tsx";
import { useState } from "react";
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

export default function New({ user, subreddit_id, errors }: { user: any }) {
    const [editor] = useState(() => withReact(createEditor()))
    const [title, setTitle] = useState<string>("");

    async function createPost(e: FormEvent) {
        e.preventDefault();
        router.post(`/post/new/${subreddit_id}`, {
            title: title,
            subreddit_id: subreddit_id,
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
                submit={(e) => createPost(e)}
                errors={errors}
            />
        </Navigation>
    )
}
