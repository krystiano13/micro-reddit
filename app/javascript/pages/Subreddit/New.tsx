import { Head } from '@inertiajs/react'
import { Navigation } from "../components/Navigation.tsx";

export default function New({ user }: { user: any, subreddits: any }) {
    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE" />
        </Navigation>
    )
}
