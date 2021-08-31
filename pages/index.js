import { getSession } from 'next-auth/client'

export default function Home({ email }) {
  return (
    <div>
      {email}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return { 
    props: {
      email: session.user.email
    }
  }
}