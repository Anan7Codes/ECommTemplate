import React from 'react';
import { Flex, Heading } from '@chakra-ui/react'

export default function Error() {
    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background="gray.100" p={12} rounded={6}>
                <Heading mb={6}>Error</Heading>
            </Flex>
        </Flex>
    )
}

