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

interface Props {
    user: {
        id: number
        email: string
        name: string
    } | null,
    subreddits: any[],
    search: string | null,
    your: any | null,
    follow: any | null
}

export default function Index({ user, subreddits, search, your, follow }: Props) {
    const [searchValue, setSearchValue] = useState<string>(search ? search : "");
    const [firstRender, setFirstRender] = useState<boolean>(true);

    const [yourSubreddits, setYourSubreddits] = useState<boolean>(your ? true : false);
    const [followedSubreddits, setFollowedSubreddits] = useState<boolean>(follow ? true : false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(!firstRender) {
                router.get(`/subreddits?search=${searchValue}${yourSubreddits ? "&your=1" : ""}${followedSubreddits ? "&follow=1" : ""}`)
            }
            else {
                setFirstRender(false)
            }
        }, 300);

        return () => {
            clearTimeout(timeout)
        }
    }, [searchValue, yourSubreddits, followedSubreddits]);

    useEffect(() => {
        if(yourSubreddits) {
            setFollowedSubreddits(false)
        }
    }, [yourSubreddits]);

    useEffect(() => {
        if(followedSubreddits) {
            setYourSubreddits(false)
        }
    }, [followedSubreddits]);

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
                        <Button
                            onClick={() => setYourSubreddits(prev => !prev)}
                            variant={yourSubreddits ? "filled" : "light"}
                        >
                            Your Subreddits
                        </Button>
                        <Button
                            onClick={() => setFollowedSubreddits(prev => !prev)}
                            variant={followedSubreddits ? "filled" : "light"}
                        >
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
