import { UnorderedList, ListItem } from '@chakra-ui/react'
import { signIn, signOut } from 'next-auth/client'
import Link from 'next/link'

const Header = () => {
    
    return (
        <UnorderedList>
            <ListItem>
                <Link href="/api/auth/signin">                
                    <a onClick={e => {
                        e.preventDefault()
                        signIn()
                    }}>Sign In</a>
                </Link>
            </ListItem>
            <ListItem>
                <Link href="/api/auth/signout">                
                    <a onClick={e => {
                        e.preventDefault()
                        signOut()
                    }}>Sign Out</a>
                </Link>
            </ListItem>
        </UnorderedList>
        
    )
}

export default Header

