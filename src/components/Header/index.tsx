import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../index';
import { useWeb3Context } from '../../EthProvider';

export default () => {
  const ctx = useWeb3Context();
  const { isWalletConnected, requestConnection, account } = ctx;

  const accountCroped = useMemo(() => {
    if (account) {
      return `${account.slice(0, 6)}...${account.slice(-4)}`;
    }
    return account;
  }, [account]);

  console.log(!isWalletConnected && !ctx.isMetamaskConnected);
  return (
    <div className="antialiased font-extrabold flex flex-col relative mb-6">
      <div className="h-14 text-5xl flex flex-row justify-center">
        <h3>SeaDogs</h3>
      </div>
      <div className="flex flex-row justify-around items-center text-xl opacity-0">
        <Link to="/">Home</Link>
      </div>
      <div className="absolute right-0">
        <Button
          title={accountCroped ?? 'Connect Wallet'}
          onClick={() => {
            console.log('requestConnection');
            requestConnection();
          }}
          disabled={!isWalletConnected && !ctx.isMetamaskConnected}
        />
      </div>
    </div>
  );
};
