import { symbolsMapping } from "../constant/slotConstanst";
import styles from "../layouts/Slot-game-classic/Slot-game-classic-styles.module.css"

export function randomSymbols(refs) {
    for (let index = 0; index < refs.length; index++) {
        refs[index].current.src = symbolsMapping[Math.floor(Math.random() * 9)]
        refs[index].current.classList.remove(styles.loserSymbols);
    }
}

export function startGameRotating(arrayOfImages, speed, resolve) {
    let gameTime = 6000 + Math.floor(Math.random() * 6000)
    let intervalId = setInterval(() => {
        for (let index = 0; index < arrayOfImages.length; index++) {
            arrayOfImages[index][1]++
            if (arrayOfImages[index][1] === 5) {
                arrayOfImages[index][1] = 0;
            }
            arrayOfImages[index][0].style.order = arrayOfImages[index][1]

            for (let index = 0; index < arrayOfImages.length; index++) {
                if (arrayOfImages[index][1] === 0 || arrayOfImages[index][1] === 4) {
                    arrayOfImages[index][0].style.position = "absolute";
                    arrayOfImages[index][0].style.zIndex = -1000;
                }
                else {
                    arrayOfImages[index][0].style.position = "initial";
                    arrayOfImages[index][0].style.zIndex = 1;
                }
            }

            speed += 100
            if (speed > gameTime) {
                clearInterval(intervalId)
                resolve() || ""
            }
        }
    }, speed)
}

export function determineIfWin(rows) {
    rows.forEach(row => {
        row.sort((a, b) => {
            return a[1] - b[1]
        })
        row.shift();
        row.pop();
    })

    console.log(rows);

    let symbols = [
        [rows[0][0][2],
        rows[0][1][2],
        rows[0][2][2],
        ], [
            rows[1][0][2],
            rows[1][1][2],
            rows[1][2][2],
        ], [
            rows[2][0][2],
            rows[2][1][2],
            rows[2][2][2],
        ]
    ]    

    let winningCombinations = [];

    for (let index = 0; index < symbols.length; index++) {
       let currentSymbol = symbols[0][index]
       if(!symbols[1].includes(currentSymbol)){
         continue
       }
       if(!symbols[2].includes(currentSymbol)){
        continue
       }
       winningCombinations.push(currentSymbol)
    }

    let winningSymbols = []

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if(winningCombinations.includes(rows[i][j][2])){
                rows[i][j][0].classList.add(styles.loserSymbols);
                winningSymbols.push(rows[i][j][2])
            }
        }
    }

    
    console.log(winningSymbols);

    return winningSymbols
}
