import { ChakraProvider } from "@chakra-ui/react"
import Header from '@/components/Header'
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {

  if(Component.getLayout) {
    return (
      Component.getLayout(
        <Provider session={pageProps.session}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Provider>
      )
    )
  }

  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Header/>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp