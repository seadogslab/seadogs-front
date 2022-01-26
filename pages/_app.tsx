import React from "react";
import "../styles/globals.css";
import EthProvider from "../components/EthProvider";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EthProvider>
      <Component {...pageProps} />
    </EthProvider>
  );
}

export default MyApp;
