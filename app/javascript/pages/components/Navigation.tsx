import { AppShell, Title, Input, Burger, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";

interface Props {
    children: ReactNode
}

const Header = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
`;

export function Navigation({ children }: Props) {
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

            </AppShell.Navbar>
            <AppShell.Main>
                { children }
            </AppShell.Main>
        </AppShell>
    )
}