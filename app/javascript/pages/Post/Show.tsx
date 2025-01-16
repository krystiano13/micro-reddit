import { Navigation } from "../components/Navigation.tsx";
import { Head, Link, router } from "@inertiajs/react";
import { Card, Title, Text, Button, Textarea } from "@mantine/core";
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

const Comment = ({ username, createdAt, body, user, userId, commentId, getComments, edited }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [content, setContent] = useState<string>(body);

    return (
        <Card style={{ marginBottom: "1rem" }}>
            <Title order={4}>{ username } { edited ? "(edited)" : "" }</Title>
            <Title order={5}>
                { moment(createdAt).format("DD-MM-YYYY HH:mm") }
            </Title>
            {
                editMode &&
                <form
                    onSubmit={async () => {
                        await router.patch(`/comments/${commentId}`, {
                            body: content,
                            edited: true
                        });

                        await getComments();
                    }}
                >
                    <Textarea
                        style={{ marginTop: "1rem" }}
                        required
                        onChange={(e) => setContent(e.target.value)}
                    >
                        { content }
                    </Textarea>
                    <section
                        style={{
                            display: "flex",
                            gap: ".5rem",
                            marginTop: "1rem"
                        }}
                    >
                        <Button
                            type="submit"
                        >
                            Update
                        </Button>
                        <Button
                            color="red"
                            onClick={() => setEditMode(false)}
                        >
                            Cancel
                        </Button>
                    </section>
                </form>
            }
            {
                !editMode &&
                <>
                    <Text>{body}</Text>
                    {
                        user && user.id === userId &&
                        <section
                            style={{
                                display: "flex",
                                gap: ".5rem"
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setEditMode(true);
                                    setContent(body);
                                }}
                            >
                                Edit
                            </Button>
                            <form onSubmit={async () => {
                                await router.delete(`/comments/${commentId}`);
                                await getComments();
                            }}>
                                <Button
                                    color="red"
                                    type="submit"
                                >
                                    Delete
                                </Button>
                            </form>
                        </section>
                    }
                </>
            }
        </Card>
    )
}

export default function Show({ user, post, errors }) {
    const [editor] = useState(() => withReact(createEditor()))
    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState([]);

    async function getComments() {
        await fetch(`/comments/${post.id}`)
            .then(res => res.json())
            .then(data => {
                setComments([...data.comments])
            })
    }

    async function sendComment() {
        if(user && user.id) {
           await router.post(`/comments/${post.id}`, {
                body: comment,
                post_id: post.id
           });

           await getComments();
        }
    }

    useEffect(() => {
        if(post.body) {
            Transforms.insertNodes(editor, JSON.parse(post.body), { at: [0, 0] });
        }
    }, [editor, post.body]);

    useEffect(() => {
        getComments();
    }, []);


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
                        <Title order={1}>{post.title}</Title>
                        <Text>
                            <b>By:</b> {post.username}
                        </Text>
                        <Text>
                            <b>Created At:</b> {moment(post.created_at).format("DD-MM-YYYY")}
                        </Text>
                        <Slate initialValue={initialValue} editor={editor}>
                            <TextEditor editor={editor} readOnly={true}/>
                        </Slate>
                        {
                            user && user.id &&
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
                {
                    user &&
                    <CardWrapper>
                        <Card>
                            <form
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem"
                                }}
                                onSubmit={sendComment}
                            >
                                <Textarea
                                    placeholder="Your comment"
                                    onChange={(event) => setComment(event.currentTarget.value)}
                                >
                                    {comment}
                                </Textarea>
                                <Button
                                    type="submit"
                                    style={{
                                        maxWidth: "15rem"
                                    }}
                                >
                                    Send
                                </Button>
                            </form>
                        </Card>
                    </CardWrapper>
                }
                <CardWrapper>
                    <section
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            marginTop: "1rem",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <section id={comments.length.toString() ?? "-1"}>
                            {
                                comments && comments.map(item => (
                                    <Comment
                                        getComments={getComments}
                                        edited={item.edited}
                                        commentId={item.id}
                                        userId={item.user_id}
                                        user={user}
                                        username={item.username}
                                        createdAt={item.created_at}
                                        body={item.body}
                                    />
                                ))
                            }
                        </section>
                    </section>
                </CardWrapper>
            </Main>
        </Navigation>
    )
}