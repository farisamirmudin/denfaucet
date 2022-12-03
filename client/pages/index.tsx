import type { NextPage } from 'next'
import Head from 'next/head'
import Body from '../components/Body'
import Faq from '../components/Faq'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Owner from '../components/Owner'
import QuickLink from '../components/QuickLink'

const Home: NextPage = () => {
  return (
    <div id="top" className="bg-gradient-to-br from-[#7D77FF] to-[#FF9482] tracking-wider py-2">
      <Head>
        <title>Den Faucet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="max-w-[900px] mx-auto lg:px-0 px-8">
        <Body />
        <Faq />
        {process.env.NEXT_PUBLIC_ENV !== 'production' && <Owner />}
        <QuickLink />
      </main>
      <Footer />
    </div>
  )
}

export default Home
