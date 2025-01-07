import { Head } from '@inertiajs/react'
import { useEffect } from "react";

export default function Home({ user }: { user: any }) {
    useEffect(() => {
        console.log(user);
    }, []);

      return (
        <>
          <Head title="REDDIT:RE" />
        </>
      )
}
