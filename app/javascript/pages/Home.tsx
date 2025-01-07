import { Head } from '@inertiajs/react'
import { Input } from '@mantine/core';

export default function Home({ name }: { name: string }) {
  return (
    <>
      <Head title="Inertia + Vite Ruby + React Example" />
      <Input placeholder="Test" type="text" />
    </>
  )
}
