import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDatabase } from '@/util/connectToDb'
import { compare } from 'bcryptjs';

const options = {
    providers: [
        Providers.Credentials({
            name: "Custom Provider",
            credentials: {
                username: { label: 'Email', type: 'text', placeholder: "john@doe.com"},
                password: { label: 'Password', type: 'Password' }
            },
            async authorize(credentials) {
                const { db } = await connectToDatabase();
                const users = await db.collection('users').findOne({ email: credentials.username });
                
                if (!users) {
                    return res.json({ success: false, message: 'User not found' });
                }

                const checkPassword = await compare(credentials.password, users.password);

                if(!checkPassword) {
                    return res.json({ success: false, message: 'Incorrect Password '});
                }

                if(!users.verified) {
                    return res.json({ success: false, message: 'Account is not verified'})
                }

                return { email: users.email }
            }
        })
    ],
    pages: { 
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        newUser: "/auth/newUser"
    },
    session: {
        jwt: true
    },
    jwt: {
        secret: '1231232131313123'
    },
    callbacks: {
        async redirect() {
            return process.env.NEXTAUTH_URL
        }
    }
}

export default (req, res) => NextAuth(req, res, options)