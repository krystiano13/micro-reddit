import { Head, Link } from '@inertiajs/react'
import styled from "styled-components"
import { Navigation } from "../components/Navigation.tsx";
import { Card, Title } from "@mantine/core";

const Main = styled.main`
    width: 100%;
    height: calc(95vh - 60px);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

export default function Index({ user, subreddits, search }: { user: any, subreddits: any }) {
    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE" />
            <Main>
                {
                    subreddits && subreddits.map(item => (
                        <Link
                            style={{ textDecoration: "none" }}
                            href={`/subreddits/${item.id}`}
                        >
                            <Card>
                                <Title>{ item.name }</Title>
                            </Card>
                        </Link>
                    ))
                }
            </Main>
        </Navigation>
    )
}
