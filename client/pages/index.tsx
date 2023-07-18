import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { Toaster } from "react-hot-toast";

const Home: NextPage = () => {
  return (
    <>
      <Toaster position="bottom-right" />
      <Head>
        <title>Den Faucet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Nav />
        <Hero />
        <Faq />
        <Footer />
      </div>
    </>
  );
};

export default Home;
