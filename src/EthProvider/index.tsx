import React, { useEffect } from 'react';
import { ethers } from 'ethers';

import SeaDogs from '../artifacts/contracts/Seadogs.json';

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
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
    seadogs: ethers.Contract;
  };
}

const values: Context = {
  isWalletConnected: false,
  isMetamaskConnected: false,
  isError: false,
  /* eslint-disable no-console */
  requestConnection: () => console.error('ERROR'),
};

const Web3Context = React.createContext(values);

export const useWeb3Context = () => React.useContext(Web3Context);

export default ({ children }: { children: React.ReactNode }) => {
  const { ethereum } = window;
  const provider = ethereum && new ethers.providers.Web3Provider(ethereum);

  const [ethContext, setEthContext] = React.useState<Context>({
    ...values,
    requestConnection: () => {
      ethereum.request({ method: 'eth_requestAccounts' });
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

      ethereum.on('connect', (connectInfo: ConnectInfo) => {
        setValue({
          isMetamaskConnected: true,
          chanId: connectInfo.chainId,
        });
      });

      ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          /*
              Connect signer to the contract
           */
          const seadogs = new ethers.Contract(
            '0xBCA94aEC301Bc462Ba6c55BC9a83eD7f14dAd37E',
            SeaDogs.abi,
            provider.getSigner(),
          );

          setValue({
            account: accounts[0],
            isWalletConnected: accounts.length > 0,
            contracts: {
              seadogs,
            },
          });
        })
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .catch((err: any) => {
          setValue({
            isError: true,
          });
          console.error(err);
        });

      ethereum.on('disconnect', () => {
        setValue({
          isMetamaskConnected: false,
          isWalletConnected: false,
        });
      });

      ethereum.on('accountsChanged', (accounts: Array<string>) => {
        // console.log('accountsChanged', accounts);
        // if (accounts.length === 0) {
        //   return;
        // }
        setValue({
          account: accounts[0],
          isWalletConnected: accounts.length !== 0,
        });
      });

      ethereum.on('chainChanged', () => window.location.reload());

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
