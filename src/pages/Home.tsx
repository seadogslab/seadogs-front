import React, { useEffect, useState } from 'react';
// import { format, getHours, getMinutes, getSeconds } from 'date-fns';
// import { BigNumber, ethers } from 'ethers';
import { Link, useNavigate } from 'react-router-dom';
import { BigNumber } from 'ethers';
import { useWeb3Context } from '../EthProvider';
import { Button } from '../components';

// interface Props {
//   startTime: number;
// }

// const Timer = ({ startTime }: Props) => {
//   const [time, setTime] = useState<number>(startTime);
//
//   useEffect(() => {
//     setInterval(() => {
//       setTime((tm) => tm + 1000);
//     }, 1000);
//   }, []);
//
//   const date = format(time, 'yyyy-MM-dd');
//
//   return (
//     <div>
//       <p className="text-3xl font-tim">Today ends in</p>
//       <div className="text-5xl border-2 rounded p-3 w-80">
//         {`${23 - getHours(time)}h ${59 - getMinutes(time)}m ${
//           59 - getSeconds(time)
//         }s`}
//       </div>
//     </div>
//   );
// };

export default () => {
  const ctx = useWeb3Context();
  const nav = useNavigate();
  const [allowQuest, setAllowQuest] = useState(false);

  ctx.contracts?.seadogs
    ?.balanceOf(ctx.account)
    .then((res: BigNumber) => {
      if (Number(res) > 0) {
        console.log(Number(res));
        setAllowQuest(true);
      }
    })
    .catch((e: any) => console.log(e));
  return (
    <div className="flex items-center justify-center h-96 ">
      <div className="items-center ">
        {!allowQuest && (
          <p className="text-center">
            To access this content you need to hold a Seadog&apos;s character
          </p>
        )}

        <div className="flex flex-row justify-center">
          {!allowQuest ? (
            <a href="https://hungry-dijkstra-2742a9.netlify.app/map.html?">
              <Button
                disabled={!allowQuest}
                onClick={() => {
                  // if (allowQuest) {
                  //   // ctx.contracts?.seadogs
                  //   //   ?.mintToken(
                  //   //     'bafkreiee4p53mprsms57pvi637eelw2rvkyuka6u5btl7hckvkvhgjptoq',
                  //   //   )
                  //   //   .then((res: any) => console.log('res', res))
                  //   //   .catch((e: any) => console.log('e', e));
                  //   // ctx.contracts?.seadogs
                  //   //   .tokenURI(3)
                  //   //   .then((res: any) => console.log('res', res))
                  //   //   .catch((e: any) => console.log('e', e));
                  //   // nav({});
                  //   // nav('https://hungry-dijkstra-2742a9.netlify.app/map.html');
                  // }
                }}
                title="Start the quest"
              />
            </a>
          ) : (
            <Button
              disabled={!allowQuest}
              onClick={() => {
                // if (allowQuest) {
                //   // ctx.contracts?.seadogs
                //   //   ?.mintToken(
                //   //     'bafkreiee4p53mprsms57pvi637eelw2rvkyuka6u5btl7hckvkvhgjptoq',
                //   //   )
                //   //   .then((res: any) => console.log('res', res))
                //   //   .catch((e: any) => console.log('e', e));
                //   // ctx.contracts?.seadogs
                //   //   .tokenURI(3)
                //   //   .then((res: any) => console.log('res', res))
                //   //   .catch((e: any) => console.log('e', e));
                //   // nav({});
                //   // nav('https://hungry-dijkstra-2742a9.netlify.app/map.html');
                // }
              }}
              title="Start the quest"
            />
          )}
        </div>
      </div>
    </div>
  );
};
