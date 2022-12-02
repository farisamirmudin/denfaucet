import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DenFaucetProvider } from '../context/DenFaucetContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DenFaucetProvider>
      <Component {...pageProps} />
    </DenFaucetProvider>
  )
}

export default MyApp
