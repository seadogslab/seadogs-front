import React, { useMemo } from "react";
import { NextPage } from "next";
import { Container } from "react-bootstrap";
import Image from "next/image";
import tavern from "../../public/tavern.png";
import styles from "../../styles/quests.module.css";

const Quests: NextPage = () => {
  const [step, setStep] = React.useState(0);
  const [displayHint, setDisplayHint] = React.useState(false);
  // const handleMouseMove = (e) => {
  //   const { left, top, width, height } = e.target.getBoundingClientRect();
  //   const x = ((e.pageX - left) / width) * 100;
  //   const y = ((e.pageY - top) / height) * 100;
  //   // console.log(left, top, width, height);
  //   // console.log(e);
  //   // console.log(x, y);
  //   // this.setState({ backgroundPosition: `${x}% ${y}%` });
  // };

  const clueArray = [
    {
      clueLine: "CURRENT CLUE:",
      coords: "0,0,270,350",
      popupText: "Find the squid!",
    },
    {
      clueLine: "CURRENT CLUE: Find the squid",
      // coords: "270,350,1000,1000",
      coords: "1048,1760,1178,1936",
      popupText: `Nice! you find the first clue! 
          
          Next, Find the entrance of the building.`,
    },
    {
      clueLine: "CURRENT CLUE: Find the entrance of the building",
      coords: "1377,962,1516,1187",
      popupText: "Bravo! you found it the entrance!",
    },
  ];

  const area = useMemo(() => {
    const clue = clueArray[step];

    return (
      <area
        shape="rect"
        style={{ backgroundColor: "red" }}
        coords={clue.coords}
        alt={`clue-${step}`}
        onClick={() => {
          setDisplayHint(false);
          setStep((step) => step + 1);
        }}
      />
    );
  }, [step]);

  const clueAreaBox = useMemo(() => {
    const clue = clueArray[step];
    return (
      <div className={styles.clueBoxArea}>
        <p>
          Step: {step + 1}/{clueArray.length}
        </p>
        <p>{clue.clueLine}</p>
        <div onClick={() => setDisplayHint(true)}>
          <p>
            Message :
            {displayHint ? clue.popupText : ` [ Click to reveal hint ]`}
          </p>
        </div>
      </div>
    );
  }, [step, displayHint]);

  return (
    <div className={styles.container}>
      {clueAreaBox}
      <div
        className={styles.mapView}
        // style={{
        //   display: "flex",
        //   width: "60em",
        //   height: "40em",
        //   overflowY: "scroll",
        //   overflowX: "scroll",
        //   whiteSpace: "nowrap",
        //   border: "1px solid white",
        // }}
      >
        <figure
        // onMouseMove={handleMouseMove}
        // style={{ backgroundPosition: "0% 0%", width: 300, height: 300 }}
        >
          <Image
            src={tavern}
            alt={"Tavern"}
            // objectFit="none"
            // width={3500}
            // height={3500}
            layout="fixed"
            useMap="#image-map"
            placeholder="blur"
            // objectPosition="50% 50%"
            onClick={(v) => console.log("clicked", v)}
          />
          <map name="image-map">{area}</map>
        </figure>
      </div>
    </div>
  );
};

export default Quests;
