import { Navigation } from "../components/Navigation.tsx";
import { Head, Link, router } from "@inertiajs/react";
import { Card, Title, Text, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { Slate, withReact } from "slate-react";
import styled from "styled-components";
import moment from 'moment';
import TextEditor from "../components/TextEditor.tsx";
import { createEditor } from "slate";
import { Transforms } from "slate";

const Main = styled.main`
    width: 100%;
    min-height: calc(95vh - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`;

const CardWrapper = styled.div`
    width: 95%;
`;

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

export default function Show({ user, post }) {
    const [editor] = useState(() => withReact(createEditor()))

    useEffect(() => {
        if(post.body) {
            Transforms.insertNodes(editor, JSON.parse(post.body), { at: [0, 0] });
        }
    }, [editor, post.body]);

    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE" />
            <Main>
                <CardWrapper>
                    <Card
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: ".5rem",
                            padding: "1.5rem",
                            borderRadius: "1rem"
                        }}>
                        <Title order={1}>{ post.title }</Title>
                        <Text>
                            <b>By:</b> { post.username }
                        </Text>
                        <Text>
                            <b>Created At:</b> { moment(post.created_at).format("DD-MM-YYYY")}
                        </Text>
                        <Slate initialValue={initialValue} editor={editor}>
                            <TextEditor editor={editor} readOnly={true} />
                        </Slate>
                        {
                            user &&
                            <>
                                {
                                    post.user_id === user.id &&
                                    <section
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem",
                                            marginTop: "1rem"
                                        }}
                                    >
                                        <Link href={`/post/${post.id}/edit`}>
                                            <Button>Edit Post</Button>
                                        </Link>
                                        <Button
                                            color="red"
                                            onClick={() => router.delete(`/post/${post.id}`)}
                                        >
                                            Delete Post
                                        </Button>
                                    </section>
                                }
                            </>
                        }
                    </Card>
                </CardWrapper>
            </Main>
        </Navigation>
    )
}