import { Head, router } from '@inertiajs/react'
import { useState } from "react";
import type { FormEvent } from "react";
import styled from "styled-components"
import { Navigation } from "../components/Navigation.tsx";
import { Card, Title, Input, Button } from "@mantine/core";

const Main = styled.main`
    display: flex;
    width: 100%;
    height: calc(95vh - 60px);
    justify-content: center;
    align-items: center;
`;

export default function Edit({ user, errors, id, subreddit }: { user: any, subreddit: any }) {
    const [values, setValues] = useState({
        name: subreddit.name,
    });

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        await router.patch(`/subreddit/${id}`, values);
    }

    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE" />
            <Main>
                <Card style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
                    <Title>Edit Subreddit's name</Title>
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                    >
                        <Input
                            type="text"
                            placeholder="Subreddit Name"
                            required
                            value={values.name}
                            onChange={(e) => setValues({...values, name: e.target.value})}
                            name="name"
                        />
                        <Button type="submit">
                            Update
                        </Button>
                    </form>
                    {
                        errors && errors.map(item => (
                            <p className="error">{ item }</p>
                        ))
                    }
                </Card>
            </Main>
        </Navigation>
    )
}
