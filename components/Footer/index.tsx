import styles from "../../styles/footer.module.css";
import React from "react";
import Image from "next/image";
import SDLogo from "../../public/seadogslogo.jpeg";
import Twitter from "../../public/twitter.png";
import Button from "../Button";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <div>
          <a
            href="https://discord.gg/hExhrj6xKP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className={styles.footerDiscord}>Discord</Button>
          </a>
        </div>
        <div className={styles.footerRow}>
          <a
            className={styles.footerTwitter}
            href="https://twitter.com/Seadogslab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Twitter} alt="Twitter" width={60} height={60} />
          </a>
        </div>
        <div className={styles.footerRow}>
          <Image src={SDLogo} alt="Fish" width={150} height={103} />
        </div>
        <div style={{ height: 60 }} />
      </div>
    </footer>
  );
};

export default Footer;
