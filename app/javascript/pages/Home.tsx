import { Head } from '@inertiajs/react'
import { Navigation } from "./components/Navigation.tsx";

export default function Home({ user }: { user: any }) {

      return (
        <Navigation user={user}>
          <Head title="REDDIT:RE" />
        </Navigation>
      )
}
