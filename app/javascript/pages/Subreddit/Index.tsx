import { Head } from '@inertiajs/react'
import { Navigation } from "../components/Navigation.tsx";

export default function Index({ user, subreddits, search }: { user: any, subreddits: any }) {
    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE" />
        </Navigation>
    )
}
