import React, { useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/home.module.css";
import { useWeb3Context } from "../components/EthProvider";
import Bg from "../public/bg-home.png";
import Button from "../components/Button";

const Home: NextPage = () => {
  const ctx = useWeb3Context();
  const [balance, setBalance] = React.useState<number | null>(null);
  // console.log("xtx", ctx);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(async () => {
    if (ctx.account && ctx.isWalletConnected) {
      const balance = await ctx.contracts?.seadogs.balanceOf(ctx.account);
      const convertedBalance = Number(balance);
      setBalance(convertedBalance);
    } else {
      setBalance(null);
    }
  }, [ctx.account, ctx.isWalletConnected]);

  return (
    <div className={styles.container}>
      <Link href="/quests">
        <Button disabled={balance === null || balance === 0}>
          Start Quest
        </Button>
      </Link>

      {balance !== null && balance > 0 ? (
        <p>You have {balance} Seadogs nft.</p>
      ) : (
        ctx.account && <p>You need to have at least one Seadogs nft!</p>
      )}
      {!ctx.account && (
        <p style={{ textAlign: "center" }}>
          Connect your wallet, and if you&lsquo;re eligible
          <br />
          you&lsquo;ll be able to start a quest!
        </p>
      )}

      {/*<main>*/}
      {/*  <p>Dark Waters! Dark Islands! Dark Souls!</p>*/}
      {/*  <p>Enter the world of the Seadogs.</p>*/}
      {/*  <p>Write the story. Join our collaborative NFT project.</p>*/}
      {/*</main>*/}
      {/*<div className={styles.bg}>*/}
      {/*  <Image src={Bg} height={600} />*/}
      {/*</div>*/}
      {/*<div*/}
      {/*  style={{*/}
      {/*    backgroundImage: `url(/bg-home.png)`,*/}
      {/*    width: "100%",*/}
      {/*    height: 400,*/}
      {/*    position: "absolute",*/}
      {/*    top: 0,*/}
      {/*    zIndex: -1,*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
};

export default Home;
