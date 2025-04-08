import { useRef, useState } from "react";
import Button from "../../components/Button/Button";
import SlotImage from "../../components/Slot-image/Slot-image";
import img7 from "../../constant/symbols/7.png";

import styles from "./Slot-game-classic-styles.module.css";
import {
  determineIfWin,
  randomSymbols,
  startGameRotating,
} from "../../utils/slotUtils";
import {
  symbolsNameMapping,
  symbolsNameAmountMapping,
} from "../../constant/slotConstanst";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import AmountButton from "../../components/Amount-Button/Amount-Button";
import requester from "../../api/requester";
import { useOutletContext } from "react-router";
import useRouteGuard from "../../hooks/useRouteGuard";

export default function SlotGameClassic({ showAside }) {
  let showAsideClass = {};
  if (showAside) {
    showAsideClass.opacity = "0.3";
    showAsideClass.pointerEvents = "none";
  }

  useRouteGuard();
  const isAuto = useRef(false);
  const isAutoRef = useRef();
  const { setReset, money } = useOutletContext();
  const [isAutoBtn, setIsAutoBtn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [inputBetAmount, setInputBetAmount] = useState("");
  const [wonAmount, setWonAmount] = useState(0);

  const SpinBtnRef = useRef();

  const slotImage1 = useRef();
  const slotImage2 = useRef();
  const slotImage3 = useRef();
  const slotImage4 = useRef();
  const slotImage5 = useRef();

  const slotImage6 = useRef();
  const slotImage7 = useRef();
  const slotImage8 = useRef();
  const slotImage9 = useRef();
  const slotImage10 = useRef();

  const slotImage11 = useRef();
  const slotImage12 = useRef();
  const slotImage13 = useRef();
  const slotImage14 = useRef();
  const slotImage15 = useRef();

  return (
    <section style={showAsideClass} className={styles.gameMainWrapper}>
      <div className={styles.gameWrapper}>
        <div className={styles.gameTop}>
          <div className={styles.symbolsContainer}>
            <SlotImage imgSrc={img7} reference={slotImage1} />
            <SlotImage imgSrc={img7} reference={slotImage2} />
            <SlotImage imgSrc={img7} reference={slotImage3} />
            <SlotImage imgSrc={img7} reference={slotImage4} />
            <SlotImage imgSrc={img7} reference={slotImage5} />
          </div>
          <div className={styles.symbolsContainer}>
            <SlotImage imgSrc={img7} reference={slotImage6} />
            <SlotImage imgSrc={img7} reference={slotImage7} />
            <SlotImage imgSrc={img7} reference={slotImage8} />
            <SlotImage imgSrc={img7} reference={slotImage9} />
            <SlotImage imgSrc={img7} reference={slotImage10} />
          </div>
          <div className={styles.symbolsContainer}>
            <SlotImage imgSrc={img7} reference={slotImage11} />
            <SlotImage imgSrc={img7} reference={slotImage12} />
            <SlotImage imgSrc={img7} reference={slotImage13} />
            <SlotImage imgSrc={img7} reference={slotImage14} />
            <SlotImage imgSrc={img7} reference={slotImage15} />
          </div>
        </div>
        <div className={styles.gameBottom}>
          <div className={styles.gameSwitchAmount}>
            <div>
              <FontAwesomeIcon
                onClick={() => {
                  setBetAmount((prevBetAmount) => {
                    if (prevBetAmount > 1) {
                      return prevBetAmount - 1;
                    }
                    return prevBetAmount;
                  });
                }}
                icon={faMinus}
              />
            </div>
            <AmountButton text={`${betAmount.toFixed(2)}$`} />
            <div>
              <FontAwesomeIcon
                onClick={() => {
                  setBetAmount((prevBetAmount) => {
                    if (prevBetAmount < 5) {
                      return prevBetAmount + 1;
                    }
                    return prevBetAmount;
                  });
                }}
                icon={faPlus}
              />
            </div>
          </div>
          <div className={styles.gameLastWinWrapper}>
            <span>Last win</span>
            <span>{wonAmount}</span>
          </div>
          <input
            disabled={isPlaying}
            type="text"
            placeholder="125$"
            className={styles.inputAmount}
            value={inputBetAmount}
            onChange={(e) => {
              if (!isNaN(Number(e.currentTarget.value))) {
                if (
                  Number(e.currentTarget.value) <= money &&
                  Number(e.currentTarget.value) > 0
                ) {
                  if (e.currentTarget.value === "") {
                    setInputBetAmount("");
                    return;
                  }
                  setInputBetAmount(Number(e.currentTarget.value));
                  return;
                } else if (e.currentTarget.value === "") {
                  setInputBetAmount("");
                }
              }
            }}
          />
          <Button
            dissabled={isPlaying}
            reference={SpinBtnRef}
            onClick={() => {
              setIsPlaying(true);
              let rows = [];

              const symbolsRefs = [
                slotImage1,
                slotImage2,
                slotImage3,
                slotImage4,
                slotImage5,
                slotImage6,
                slotImage7,
                slotImage8,
                slotImage9,
                slotImage10,
                slotImage11,
                slotImage12,
                slotImage13,
                slotImage14,
                slotImage15,
              ];

              randomSymbols(symbolsRefs);

              for (let index = 0; index < 15; index += 5) {
                let arrayOfImages = symbolsRefs
                  .slice(index, index + 5)
                  .map((value, index) => {
                    return [
                      value.current,
                      index,
                      symbolsNameMapping[value.current.src.substring(21)],
                    ];
                  });
                rows.push(arrayOfImages);
              }

              new Promise((resolve) => {
                startGameRotating(rows[0], 80, resolve);
              }).then(() => {
                new Promise((resolve) => {
                  startGameRotating(rows[1], 80, resolve);
                }).then(() => {
                  new Promise((resolve) => {
                    startGameRotating(rows[2], 80, resolve);
                  }).then(() => {
                    const wins = determineIfWin(rows);
                    let wonAmountFromGame = 0;
                    let finalBetAmount;

                    if (inputBetAmount) {
                      finalBetAmount = Number(inputBetAmount);
                    } else {
                      finalBetAmount = Number(betAmount);
                    }

                    console.log(finalBetAmount);

                    wins.forEach((symbol) => {
                      wonAmountFromGame +=
                        Number(symbolsNameAmountMapping[symbol]) *
                          finalBetAmount +
                        finalBetAmount;
                    });

                    wonAmountFromGame = parseInt(wonAmountFromGame);

                    setWonAmount(wonAmountFromGame);
                    if (wonAmountFromGame !== 0) {
                      requester(
                        "POST",
                        import.meta.env.VITE_API_ADRESS + "/casino/game/1",
                        { wonAmount: Number(wonAmountFromGame) }
                      ).then(() => {
                        setReset((prevState) => {
                          return !prevState;
                        });
                        setIsPlaying(false);
                      });
                    } else {
                      requester(
                        "PUT",
                        import.meta.env.VITE_API_ADRESS + "/casino/game/1",
                        { amount: finalBetAmount }
                      ).then(() => {
                        setReset((prevState) => {
                          return !prevState;
                        });
                        setIsPlaying(false);
                      });
                    }
                  });
                });
              });
            }}
            text={"Spin"}
          />
          <Button
            dissabled={isAuto.current === false && isPlaying === true}
            autoPlay={isAutoBtn}
            onClick={() => {
              setIsAutoBtn(true);
              isAuto.current = !isAuto.current;
              if (isAuto.current && isPlaying === false) {
                isAutoRef.current = setInterval(() => {
                  if (!isPlaying) {
                    if (SpinBtnRef.current === null) {
                      clearInterval(isAutoRef.current);
                      return;
                    }
                    SpinBtnRef.current.click();
                  }
                }, 0);
              }
              if (isAuto.current === false) {
                clearInterval(isAutoRef.current);
                setIsAutoBtn(false);
              }
            }}
            text="Auto play"
          />
        </div>
      </div>
    </section>
  );
}
