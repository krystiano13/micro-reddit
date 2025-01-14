import { Head } from '@inertiajs/react'
import { Navigation } from "./components/Navigation.tsx";

export default function Home({ user, posts }: { user: any }) {
    console.log(posts);
    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE" />
        </Navigation>
    )
}
