import {Head, Link, router} from '@inertiajs/react'
import { Navigation } from "../components/Navigation.tsx";
import {Title, Button, Card, Text} from "@mantine/core";
import styled from "styled-components";
import moment from "moment/moment";

const CardWrapper = styled.div`
    width: 40rem;
    
    @media screen and (max-width: 1200px) {
        width: 30rem;
    }
    
    @media screen and (max-width: 639px) {
        width: 95vw;
    }
`;


export default function Show({ user, subreddit, id, subreddit_follower, posts }: { user: any, subreddit: any, id: any }) {
    async function deleteSubreddit() {
        await router.delete(`/subreddit/${id}`);
    }

    async function unfollowSubreddit() {
        await router.delete(`/subreddit_followers/${subreddit_follower.id}`)
    }

    async function followSubreddit() {
        await router.post(`/subreddit_followers/${subreddit.id}`)
    }

    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE" />
            <Title>{ subreddit.name }</Title>
            <section
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem"
                }}
            >
                {
                    user &&
                    <Button onClick={() => router.get(`/post/new/${subreddit.id}`)}>
                        Create Post
                    </Button>
                }
                {
                    user && (subreddit.user_id !== user.id) && <>
                        {
                            subreddit_follower ?
                                <Button
                                    onClick={unfollowSubreddit}
                                    color="red"
                                >
                                    Unfollow Subreddit
                                </Button>
                                :
                                <Button
                                    onClick={followSubreddit}
                                >
                                    Follow Subreddit
                                </Button>
                        }
                    </>
                }
                {
                    user && subreddit.user_id === user.id &&
                    <Button
                        onClick={deleteSubreddit}
                        color="red"
                    >
                        Delete Subreddit
                    </Button>
                }
            </section>
            <br />
            <section
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginTop: "1rem"
                }}
            >
                {
                    posts.map(post => (
                        <Link style={{ textDecoration: "none" }} href={`/post/${post.id}`}>
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
                                </Card>
                            </CardWrapper>
                        </Link>
                    ))
                }
            </section>
        </Navigation>
    )
}
