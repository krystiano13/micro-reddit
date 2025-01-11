import { Head, Link, router } from '@inertiajs/react'
import { useState, useEffect } from "react";
import styled from "styled-components"
import { Navigation } from "../components/Navigation.tsx";
import { Card, Title, Input } from "@mantine/core";

const Main = styled.main`
    width: 100%;
    height: calc(95vh - 60px);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

export default function Index({ user, subreddits, search }: { user: any, subreddits: any, search: string }) {
    const [searchValue, setSearchValue] = useState<string>(search ? search : "");
    const [firstRender, setFirstRender] = useState<boolean>(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(!firstRender) {
                router.get(`/subreddits?search=${searchValue}`)
            }
            else {
                setFirstRender(false)
            }
        }, 300);

        return () => {
            clearTimeout(timeout)
        }
    }, [searchValue]);

    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE" />
            <Main>
                <Input
                    autoFocus={true}
                    onInput={(e) => setSearchValue(e.target.value)}
                    onMouseOver={(e) => e.preventDefault()}
                    value={searchValue}
                    name="search"
                    placeholder="Search for subreddits"
                />
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
