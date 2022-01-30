import React from "react";
import style from "../styles/utils.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import EthProvider from "../components/EthProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EthProvider>
      <Container className={style.container}>
        <Header />
        <Head>
          <title>Seadogs</title>
          <meta name="description" content="Write the story. Play the game" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Container>
    </EthProvider>
  );
}

export default MyApp;
