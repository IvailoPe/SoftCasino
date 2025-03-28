import SlotImage from "../../components/Slot-image/Slot-image";
import styles from "./Arcade-game-classic-styles.module.css";
import imgBomb from "../../constant/symbols/bomb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import AmountButton from "../../components/Amount-Button/Amount-Button";
import { useRef, useState } from "react";
import { useOutletContext } from "react-router";
import Button from "../../components/Button/Button";
import initialGameField from "./gameInitialState";
import requester from "../../api/requester";

export default function ArcadeGameClassic() {
  const [difficulty, setDifficulty] = useState("easy");
  const [inputBetAmount, setInputBetAmount] = useState("");
  const [canPlay, setCanPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wonAmount, setWonAmount] = useState("");
  const canContinue = useRef(true);
  const { setReset, money } = useOutletContext();
  const [gameField, setGameField] = useState(initialGameField);
  const refresher = useRef(0);

  let bombs = 1;

  if (difficulty === "medium") {
    bombs = 3;
  } else if (difficulty === "hard") {
    bombs = 5;
  }

  return (
    <section className={styles.gameMainWrapper}>
      <div className={styles.gameWrapper}>
        <div className={styles.gameTop}>{gameField}</div>
        <div className={styles.gameBottom}>
          <div className={styles.gameSwitchAmount}>
            <div
              onClick={() => {
                setDifficulty((prevDiff) => {
                  if (prevDiff === "hard") {
                    return "medium";
                  } else {
                    return "easy";
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faMinus} />
            </div>
            <AmountButton text={`${difficulty}`} styleObj={{ width: "89px" }} />
            <div
              onClick={() => {
                setDifficulty((prevDiff) => {
                  console.log(prevDiff);
                  if (prevDiff === "easy") {
                    return "medium";
                  } else {
                    return "hard";
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className={styles.gameBombAmountWrapper}>
            <span>Bombs</span>
            <span>{bombs}</span>
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
                  Number(e.currentTarget.value) < money &&
                  Number(e.currentTarget.value) > 0
                ) {
                  if (e.currentTarget.value === "") {
                    setInputBetAmount("");
                    setCanPlay(false);
                    return;
                  }
                  setInputBetAmount(Number(e.currentTarget.value));
                  setCanPlay(true);
                  return;
                } else if (e.currentTarget.value === "") {
                  setInputBetAmount("");
                  setCanPlay(false);
                }
              }
            }}
          />
          <Button
            dissabled={canPlay === false || isPlaying === true}
            onClick={() => {
              requester(
                "PUT",
                import.meta.env.VITE_API_ADRESS + "/casino/game/1",
                { amount: inputBetAmount }
              ).then(() => {
                setReset((prevState) => {
                  return !prevState;
                });
              });

              setIsPlaying(true);
              canContinue.current = true;
              let gameField = [];
              let arrayField = [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
              ];

              let multi = 0.2;

              if (difficulty === "medium") {
                multi = 0.5;
              } else if (difficulty === "hard") {
                multi = 0.7;
              }

              for (let index = 0; index < bombs; index++) {
                let column = Math.floor(Math.random() * 5);
                let row = Math.floor(Math.random() * 5);
                while (arrayField[column][row] === true) {
                  column = Math.floor(Math.random() * 5);
                  row = Math.floor(Math.random() * 5);
                }
                arrayField[column][row] = true;
              }

              for (let index = 0; index < 5; index++) {
                gameField[index] = (
                  <div
                    className={styles.symbolsContainer}
                    key={refresher.current}
                  >
                    <div
                      onClick={(e) => {
                        if (canContinue.current !== false) {
                          if (arrayField[index][0]) {
                            e.currentTarget.classList.remove(styles.hideBomb);
                            e.currentTarget.classList.add(styles.showBomb);
                            setWonAmount("");
                            setIsPlaying(false);
                            setCanPlay(false);
                            setInputBetAmount("");
                            canContinue.current = false;
                            return;
                          }
                          if (
                            !e.currentTarget.classList.contains(
                              styles.showWrapper
                            )
                          ) {
                            setWonAmount((prevAmount) => {
                              return parseInt(multi * prevAmount + prevAmount);
                            });
                            e.currentTarget.classList.add(styles.showWrapper);
                          }
                        }
                      }}
                      className={`${styles.bombContainer} ${styles.hideBomb}`}
                    >
                      {arrayField[index][0] && <SlotImage imgSrc={imgBomb} />}
                    </div>
                    <div
                      onClick={(e) => {
                        if (canContinue.current !== false) {
                          if (arrayField[index][1]) {
                            e.currentTarget.classList.remove(styles.hideBomb);
                            e.currentTarget.classList.add(styles.showBomb);
                            setWonAmount("");
                            setIsPlaying(false);
                            setCanPlay(false);
                            setInputBetAmount("");
                            canContinue.current = false;
                            return;
                          }
                          if (
                            !e.currentTarget.classList.contains(
                              styles.showWrapper
                            )
                          ) {
                            setWonAmount((prevAmount) => {
                              return parseInt(multi * prevAmount + prevAmount);
                            });
                            e.currentTarget.classList.add(styles.showWrapper);
                          }
                        }
                      }}
                      className={`${styles.bombContainer} ${styles.hideBomb}`}
                    >
                      {arrayField[index][1] && <SlotImage imgSrc={imgBomb} />}
                    </div>
                    <div
                      onClick={(e) => {
                        if (canContinue.current !== false) {
                          if (arrayField[index][2]) {
                            e.currentTarget.classList.remove(styles.hideBomb);
                            e.currentTarget.classList.add(styles.showBomb);
                            setWonAmount("");
                            setIsPlaying(false);
                            setCanPlay(false);
                            setInputBetAmount("");
                            canContinue.current = false;
                            return;
                          }
                          if (
                            !e.currentTarget.classList.contains(
                              styles.showWrapper
                            )
                          ) {
                            setWonAmount((prevAmount) => {
                              return parseInt(multi * prevAmount + prevAmount);
                            });
                            e.currentTarget.classList.add(styles.showWrapper);
                          }
                        }
                      }}
                      className={`${styles.bombContainer} ${styles.hideBomb}`}
                    >
                      {arrayField[index][2] && <SlotImage imgSrc={imgBomb} />}
                    </div>
                    <div
                      onClick={(e) => {
                        if (canContinue.current !== false) {
                          if (arrayField[index][3]) {
                            e.currentTarget.classList.remove(styles.hideBomb);
                            e.currentTarget.classList.add(styles.showBomb);
                            setWonAmount("");
                            setIsPlaying(false);
                            setCanPlay(false);
                            setInputBetAmount("");
                            canContinue.current = false;
                            return;
                          }
                          if (
                            !e.currentTarget.classList.contains(
                              styles.showWrapper
                            )
                          ) {
                            setWonAmount((prevAmount) => {
                              return parseInt(multi * prevAmount + prevAmount);
                            });
                            e.currentTarget.classList.add(styles.showWrapper);
                          }
                        }
                      }}
                      className={`${styles.bombContainer} ${styles.hideBomb}`}
                    >
                      {arrayField[index][3] && <SlotImage imgSrc={imgBomb} />}
                    </div>
                    <div
                      onClick={(e) => {
                        if (canContinue.current !== false) {
                          if (arrayField[index][4]) {
                            e.currentTarget.classList.remove(styles.hideBomb);
                            e.currentTarget.classList.add(styles.showBomb);
                            setWonAmount("");
                            setIsPlaying(false);
                            setCanPlay(false);
                            setInputBetAmount("");
                            canContinue.current = false;
                            return;
                          }
                          if (
                            !e.currentTarget.classList.contains(
                              styles.showWrapper
                            )
                          ) {
                            setWonAmount((prevAmount) => {
                              return parseInt(multi * prevAmount + prevAmount);
                            });
                            e.currentTarget.classList.add(styles.showWrapper);
                          }
                        }
                      }}
                      className={`${styles.bombContainer} ${styles.hideBomb}`}
                    >
                      {arrayField[index][4] && <SlotImage imgSrc={imgBomb} />}
                    </div>
                  </div>
                );
                refresher.current += 1;
              }

              setGameField(() => {
                return <>{gameField}</>;
              });
              setWonAmount(inputBetAmount);
            }}
            text={"Play"}
          />
          <Button
            onClick={() => {
              requester(
                "POST",
                import.meta.env.VITE_API_ADRESS + "/casino/game/1",
                { wonAmount: Number(wonAmount) }
              ).then(() => {
                setReset((prevState) => {
                  return !prevState;
                });
                setWonAmount("");
                setIsPlaying(false);
                setCanPlay(false);
                setInputBetAmount("");
                canContinue.current = false;
              });
            }}
            dissabled={!isPlaying}
            text={"Cash out"}
          />
          <div className={styles.gameBombAmountWrapper}>
            <span>Winning!</span>
            <span>{wonAmount}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
