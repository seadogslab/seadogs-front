import React, { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import tavern from '../../assets/tavern.jpeg';

import { useWeb3Context } from '../../EthProvider';

const clueArray = [
  {
    clueLine: 'CURRENT CLUE:',
    coords: '0,0,0,0',
    popupText: '1 Clue: Find the squid!',
  },
  {
    clueLine: 'CURRENT CLUE:',
    coords: '0,0,0,0',
    popupText: '1 Clue: Find the squid!',
  },
  {
    clueLine: 'CURRENT CLUE:',
    coords: '0,0,0,0',
    popupText: '1 Clue: Find the squid!',
  },
  {
    clueLine: 'CURRENT CLUE: Find the squid',
    coords: '1048,1760,1178,1936',
    popupText: `Nice! you find the first clue! 
          
          Next, Find the entrance of the building.`,
  },
  {
    clueLine: 'CURRENT CLUE: Find the entrance of the building',
    coords: '1377,962,1516,1187',
    popupText: 'Bravo! you found it the entrance!',
  },
];

export default () => {
  const ctx = useWeb3Context();
  const nav = useNavigate();
  const [clueIdx, setClueIdx] = useState(0);

  ctx.contracts?.seadogs.balanceOf(ctx.account).then((res: BigNumber) => {
    if (Number(res) === 0) {
      nav('/');
    }
  });
  // ctx.contracts?.seadogs.getFistDayBid().then((res: BigNumber) => {
  //   console.log(Number(res));
  // });
  console.log(ctx);
  return (
    <div>
      <div className="flex items-center justify-center h-96 ">
        <h1 className="text-7xl font-bold">The Driftwood Tavern</h1>
        <div>
          <p>CURRENT MISSION: Find the quid</p>
        </div>
      </div>
      <div>
        <img
          className="object-none overflow-scroll"
          src={tavern}
          alt="tavern"
          width="100%"
        />
      </div>
    </div>
  );
};
