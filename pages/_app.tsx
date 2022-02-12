import React from "react";
import style from "../styles/home.module.css";
import "../styles/globals.css";

import EthProvider from "../components/EthProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EthProvider>
      <div
        style={{
          // zIndex: -1,
          position: "absolute",
          width: "100%",
          height: "auto",
        }}
      >
        <Head>
          <title>Seadogs</title>
          <meta name="description" content="Write the story. Play the game" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main style={{ height: "100%" }}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </EthProvider>
  );
}

export default MyApp;
