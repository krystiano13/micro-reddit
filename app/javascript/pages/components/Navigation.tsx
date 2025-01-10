import { router, Link } from "@inertiajs/react";
import { AppShell, Title, Input, Burger, useMantineColorScheme } from '@mantine/core'
import { Button, Card, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";

interface Props {
    children: ReactNode,
    user: any
}

const Header = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
`;

const Nav = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.25rem;
    
    padding: 1.5rem;
    
    button {
        width: 100%;
    }
`;

export function Navigation({ children, user }: Props) {
    const [opened, { toggle }] = useDisclosure();
    const { setColorScheme } = useMantineColorScheme();

    useEffect(() => {
        setColorScheme("dark");
    }, []);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Header>
                    <Title c="blue" order={2}>REDDIT:RE</Title>
                    <Input
                        placeholder="search"
                        name="reddit"
                        type="text"
                        radius="lg"
                        style={{ minWidth: "16rem" }}
                    />
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                </Header>
            </AppShell.Header>
            <AppShell.Navbar>
                <Nav>
                    <section style={{ display: "flex", flexDirection: "column",gap: "1rem" }}>
                        <Link href="/subreddits">
                            <Button variant="light">Subreddits</Button>
                        </Link>
                        {
                            !user &&
                            <>
                                <a href="/users/sign_in">
                                    <Button variant="light">Log In</Button>
                                </a>
                                <a href="/users/sign_up">
                                    <Button>Register</Button>
                                </a>
                            </>
                        }
                        {
                            user &&
                            <>
                                <Button onClick={() => {
                                    router.delete("/users/sign_out");
                                }}>
                                    Log Out
                                </Button>
                            </>
                        }
                    </section>
                    <Card>
                        { !user && <Text>You are logged as Guest</Text> }
                        { user && <>
                            <Text fw={700}>{ user.name }</Text>
                            <Text fw={500}>{ user.email }</Text>
                        </> }
                    </Card>
                </Nav>
            </AppShell.Navbar>
            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    )
}