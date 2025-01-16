import { Head, Link } from '@inertiajs/react'
import { Navigation } from "./components/Navigation.tsx";
import styled from "styled-components";
import { Card, Title, Text } from "@mantine/core";
import moment from 'moment';

const Main = styled.main`
    width: 100%;
    min-height: calc(95vh - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`;

const CardWrapper = styled.div`
    width: 40rem;
    
    @media screen and (max-width: 1200px) {
        width: 30rem;
    }
    
    @media screen and (max-width: 639px) {
        width: 95vw;
    }
`;

export default function Home({ user, posts, all_pages }: { user: any }) {
    return (
        <Navigation user={user}>
            <Head title="REDDIT:RE" />
            <Main>
                {
                    posts.map(post => (
                       <Link style={{ textDecoration: "none" }} href={`/post/${post.id}`}>
                           <CardWrapper>
                               <Card
                                   style={{
                                       width: "100%",
                                       display: "flex",
                                       flexDirection: "column",
                                       gap: ".5rem",
                                       padding: "1.5rem",
                                       borderRadius: "1rem"
                                   }}>
                                   <Title order={1}>{ post.title }</Title>
                                   <Text>
                                       <b>By:</b> { post.username }
                                   </Text>
                                   <Text>
                                       <b>Created At:</b> { moment(post.created_at).format("DD-MM-YYYY")}
                                   </Text>
                               </Card>
                           </CardWrapper>
                       </Link>
                    ))
                }
            </Main>
        </Navigation>
    )
}
