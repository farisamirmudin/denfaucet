import type { NextPage } from 'next'
import Head from 'next/head'
import Body from '../components/Body'
import Faq from '../components/Faq'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'


const Home: NextPage = () => {
  return (
    <>
    <Toaster position='top-left' />
      <Head>
        <title>Den Faucet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="top" className="banner">
        <div className="max-w-4xl mx-auto lg:px-0 px-8 text-gray-100 font-light">
          <Body />
          <Faq />
          <Footer />
        </div>
      </div>
    </>

  )
}

export default Home
