import { Head, Link, router } from '@inertiajs/react'
import { useState, useEffect } from "react";
import styled from "styled-components"
import { Navigation } from "../components/Navigation.tsx";
import { Card, Title, Input, Button } from "@mantine/core";

const Main = styled.main`
    width: 100%;
    height: calc(95vh - 60px);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

const Filters = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    
    section {
        width: 30%;
        display: flex;
        gap: 1rem;
        
        button {
            width: 100%;
        }
    }
    
    @media screen and (max-width: 639px) {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        
        section {
            width: 100%;
        }
    }
`;

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
                <Filters>
                    <Input
                        className="filter-input"
                        autoFocus={true}
                        onInput={(e) => setSearchValue(e.target.value)}
                        onMouseOver={(e) => e.preventDefault()}
                        value={searchValue}
                        name="search"
                        placeholder="Search for subreddits"
                    />
                    <section>
                        <Button>
                            Your Subreddits
                        </Button>
                        <Button>
                            Followed Subreddits
                        </Button>
                    </section>
                </Filters>
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
