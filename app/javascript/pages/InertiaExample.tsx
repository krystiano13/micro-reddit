import { Head } from '@inertiajs/react'
import { Input } from '@mantine/core';
import '@mantine/core/styles.css';
import cs from './InertiaExample.module.css'

export default function InertiaExample({ name }: { name: string }) {
  return (
    <>
      <Head title="Inertia + Vite Ruby + React Example" />
      <Input placeholder="Test" type="text" />
    </>
  )
}
