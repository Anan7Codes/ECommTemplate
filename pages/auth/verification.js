import React from 'react';
import { Flex, Heading } from '@chakra-ui/react'
import { connectToDatabase } from '@/util/connectToDb'

export default function Verification({ verified }) {
    if(!verified) {
        return (
            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background="gray.100" p={12} rounded={6}>
                    <Heading mb={6}>Not Verified</Heading>
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background="gray.100" p={12} rounded={6}>
                <Heading mb={6}>Verified</Heading>
            </Flex>
        </Flex>
    )
}

Verification.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

export async function getServerSideProps({ query }) {
    const { db } = await connectToDatabase();
    console.log(query)
    const User = await db.collection('users').findOne({ email: query.email });
    console.log(User)

    if(query.verificationCode === User.verificationCode) {
        db.collection('users').updateOne({ email: query.email}, { $set: { verified: true }}, function(err, res) {
            if (err) {
                return {
                    props: {
                      verified: false
                    }
                }
            }
        })
        return {
            props: {
              verified: true
            }
        }
    }
    return {
        props: {
          verified: false
        }
    }
}
