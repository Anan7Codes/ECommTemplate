import React from 'react';
import { getCsrfToken } from 'next-auth/client'
import { Flex, Heading, Input, Button } from '@chakra-ui/react'

export default function SignIn({ csrfToken }) {
    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background="gray.100" p={12} rounded={6}>
                <Heading mb={6}>Log In</Heading>
                <form method="POST" action="/api/auth/callback/credentials">
                    <Input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                    <Input placeholder="anan@anan.com" variant="filled" name="username" mb={3} type="email"/>
                    <Input placeholder="********" variant="filled" name="password" mb={6} type="password"/>
                    <Button colorScheme="teal" type="submit">Log In</Button>
                </form>
            </Flex>
        </Flex>
    )
}

SignIn.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
          csrfToken: await getCsrfToken(context)
        }
    }
}
