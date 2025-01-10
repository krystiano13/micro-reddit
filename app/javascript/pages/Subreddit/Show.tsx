import { Head, router } from '@inertiajs/react'
import { Navigation } from "../components/Navigation.tsx";
import { Title, Button } from "@mantine/core";

export default function Show({ user, subreddit, id }: { user: any, subreddit: any }) {
    async function deleteSubreddit() {
        await router.delete(`/subreddits/${id}`);
    }

    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE" />
            <Title>{ subreddit.name }</Title>
            {
                subreddit.user_id === user.id &&
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
