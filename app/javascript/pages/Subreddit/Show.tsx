import { Head, router } from '@inertiajs/react'
import { Navigation } from "../components/Navigation.tsx";
import { Title, Button } from "@mantine/core";

export default function Show({ user, subreddit, id, subreddit_follower }: { user: any, subreddit: any, id: any }) {
    async function deleteSubreddit() {
        await router.delete(`/subreddits/${id}`);
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
            {
                user && <>
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
        </Navigation>
    )
}
