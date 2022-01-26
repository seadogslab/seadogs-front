import React, { useEffect } from "react";
import { ethers } from "ethers";

// import Bids from "../artifacts/contracts/Bids.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface ConnectInfo {
  chainId: string;
}

interface Context {
  isWalletConnected: boolean;
  isMetamaskConnected: boolean;
  account?: string;
  chanId?: string;
  requestConnection: () => void;
  isError: boolean;
  provider?: ethers.providers.Web3Provider;
  contracts?: {
    bids: ethers.Contract;
  };
}

const values: Context = {
  isWalletConnected: false,
  isMetamaskConnected: false,
  isError: false,
  requestConnection: () => console.error("ERROR"),
};

const Web3Context = React.createContext(values);

export const useWeb3Context = () => React.useContext(Web3Context);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);

  const [ethContext, setEthContext] = React.useState<Context>({
    ...values,
    requestConnection: () => {
      ethereum.request({ method: "eth_requestAccounts" });
    },
    provider,
  });

  const setValue = (keys: Partial<Context>) => {
    setEthContext((prevState) => ({
      ...prevState,
      ...keys,
    }));
  };

  useEffect(() => {
    if (ethereum) {
      // setValue({
      //   contracts: {
      //     bids: new ethers.Contract(
      //       '0xBa8eA7597513D717263ed7542a8d374BBB5FEfc0',
      //       Bids.abi,
      //       ethContext.provider,
      //     ),
      //   },
      // });

      ethereum.on("connect", (connectInfo: ConnectInfo) => {
        setValue({
          isMetamaskConnected: true,
          chanId: connectInfo.chainId,
        });
      });

      ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          /*
              Connect signer to the contract
           */
          // const bids = new ethers.Contract(
          //   "0x1Fd849c0399F157542FE201d6e563cce98DA25B7",
          //   Bids.abi,
          //   provider.getSigner()
          // );

          setValue({
            account: accounts[0],
            isWalletConnected: accounts.length > 0,
            // contracts: {
            //   bids,
            // },
          });
        })
        .catch((err: any) => {
          setValue({
            isError: true,
          });
          console.error(err);
        });

      ethereum.on("disconnect", () => {
        // console.log('disconnect');

        setValue({
          isMetamaskConnected: false,
          isWalletConnected: false,
        });
      });

      ethereum.on("accountsChanged", (accounts: Array<string>) => {
        // console.log('accountsChanged', accounts);
        // if (accounts.length === 0) {
        //   return;
        // }
        setValue({
          account: accounts[0],
          isWalletConnected: accounts.length !== 0,
        });
      });

      ethereum.on("chainChanged", () => window.location.reload());

      // ethereum.request({ method: 'eth_chainId' }).then((chainId: string) => {
      //   setEthContext((prev) => ({
      //     ...prev,
      //     chainId,
      //   }));
      // });

      // console.log('ok', ethereum.isConnected());
      // setEthContext((prev) => ({
      //   ...prev,
      //   isMetamaskConnected: ethereum.isConnected(),
      // }));
    }
    // ethereum.request({ method: 'eth_requestAccounts' });
  }, [ethereum]);
  return (
    <Web3Context.Provider value={ethContext}>{children}</Web3Context.Provider>
  );
};

export default Provider;
