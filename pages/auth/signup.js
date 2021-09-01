import { useState } from 'react';
import { Flex, Heading, Input, Button, useToast, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ loading, setLoading ] = useState(false)
    const toast = useToast()
    const router = useRouter()

    const SignUpUser = async () => {
        setLoading(true)
        const url = '/api/auth/signup'
        const options = {
            method: 'POST',
            body: JSON.stringify({
                email, password
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }

        const postResult = await fetch(url, options)
        const res = await postResult.json()

        setLoading(false)
        if(!res.success) return toast({
            title: 'User Creation',
            description: res.message,
            status: 'error',
            duration: 5000,
            isClosable: true
        })
        
        if(res.success) toast({
            title: 'User Creation',
            description: res.message,
            status: 'success',
            duration: 5000,
            isClosable: true
        })

        router.push('/auth/signin')


    }

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background="gray.100" p={12} rounded={6}>
                { loading ? 
                    <Spinner />
                :
                    <>
                        <Heading mb={6}>Sign Up</Heading>
                        <form method="POST" action="/api/auth/callback/credentials">
                            <Input placeholder="anan@anan.com" variant="filled" name="username" mb={3} type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                            <Input placeholder="********" variant="filled" name="password" mb={6} type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                            <Button colorScheme="teal" onClick={SignUpUser}>Sign Up</Button>
                        </form>
                    </>
                }
            </Flex>
        </Flex>
    )
}

SignUp.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

