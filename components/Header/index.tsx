import React, { useEffect, useMemo, useState } from "react";
// import { Button, Col, Container, Row } from "react-bootstrap";
import { useWeb3Context } from "../EthProvider";
import style from "../../styles/header.module.css";
import Image from "next/image";
import Seadogs from "../../public/typo-seadogswhite.png";
import Button from "../Button";
import Link from "next/link";

const Header = () => {
  const ctx = useWeb3Context();
  const [img, setImg] = useState<string | null>(null);
  console.log(ctx);

  const accountCroped = useMemo(() => {
    if (ctx?.account) {
      return `${ctx.account.slice(0, 6)}...${ctx.account.slice(-4)}`;
    }
    return ctx?.account;
  }, [ctx?.account]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(async () => {
    if (ctx.account && ctx.isWalletConnected) {
      const balance = await ctx.contracts?.seadogs.balanceOf(ctx.account);
      const convertedBalance = Number(balance);
      if (convertedBalance > 0) {
        const tokenIds = await ctx.contracts?.seadogs.userTokens(ctx.account);
        const tokenUri = await ctx.contracts?.seadogs.tokenURI(tokenIds[0]);
        const tokenUriSplit = tokenUri.replace(
          "ipfs://",
          "https://ipfs.io/ipfs/"
        );
        try {
          const response = await fetch(tokenUriSplit);
          const json = await response.json();
          setImg(json.image);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setImg(null);
    }
  }, [ctx.account, ctx.isWalletConnected]);

  const Img = useMemo(() => {
    if (!ctx.account) {
      return null;
    }
    if (img) {
      return (
        <Image src={img} width="100vw" height="100vw" className={style.pp} />
      );
    }
    return <div className={style.ppEmpty}>No Seadogs</div>;
  }, [img]);

  return (
    <div className={style.container}>
      <div className={style.title}>
        <Link href="/">
          <Image src={Seadogs} width={236} height={78} alt="Seadogs typo" />
        </Link>
      </div>
      <div className={style.wallet}>
        {!ctx.account || !ctx.isWalletConnected ? (
          <Button
            onClick={() => ctx.requestConnection()}
            disabled={!ctx.isMetamaskConnected}
          >
            Connect
          </Button>
        ) : null}

        <div style={{ textAlign: "center", paddingTop: "30px" }}>
          {Img}
          <p className={style.address} onClick={() => ctx.requestDisconnect()}>
            {accountCroped ? accountCroped : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
