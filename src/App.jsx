import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Dice from "./components/Dice";
import Confetti from 'react-confetti'


function App() {

  const allTimeRecord = Number(localStorage.getItem("RecordTenzies") || 50)
  //localStorage.removeItem("RecordTenzies")
  const [randomNumbers, setRandomNumbers] = useState(JogaDado());
  const [win, setWin] = useState(false);
  const [count, setCount] = useState(0)

  function JogaDado() {
    let Arr = [];
    for (let i = 0; i < 10; i++) {
      Arr.push(Math.floor(Math.random() * 6) + 1);
    }
    let diceRandomObj = Arr.map((ranNum, index) => {
      return {
        number: ranNum,
        id: index,
        on: false,
      };
    });
    return diceRandomObj;
  }

  function rollDice() {
    setRandomNumbers((prevState) =>
      prevState.map((dice) => {
        return dice.on
          ? dice
          : {
              number: Math.floor(Math.random() * 6) + 1,
              id: Math.floor(Math.random() * 600000) + 1,
              on: false,
            };
      })
    );
    setCount(prevState => prevState + 1)
  }

  function SelectNumber(id) {
    setRandomNumbers((prevState) =>
      prevState.map((elem) => {
        return elem.id === id ? { ...elem, on: !elem.on } : elem;
      })
    );
  }

  function resetGame() {
    setRandomNumbers(JogaDado);
    setWin(false);
    setCount(0)
  }

  useEffect(() => {
    const allHeld = randomNumbers.every((die) => die.on);
    const firstValue = randomNumbers[0].number;
    const allSameValue = randomNumbers.every(
      (die) => die.number === firstValue
    );
    if (allHeld && allSameValue) {
      setWin(true);
      // put delay into this "if statement", in order to our Winner record render the proper value
      setTimeout(() => {
	        if (count < allTimeRecord || !allTimeRecord){
	          localStorage.setItem("RecordTenzies", count)
	        }
      }, 100);
    }
  }, [randomNumbers]);

  let DiceGame = randomNumbers.map((elem) => {
    return (
      <Dice
        num={elem.number}
        key={elem.id}
        on={elem.on}
        StopRoll={() => SelectNumber(elem.id)}
      />
    );
  });

  console.log(count, allTimeRecord)
  return (
    <div className="App">
      {win && <Confetti numberOfPieces={300} />}
      <h1 className="main-title">Tenzies</h1>
      <p className="main-p">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="board-container">{DiceGame}</div>
      <button
        className={`btn ${win ? "hidden" : ""}`}
        id="play-btn"
        onClick={rollDice}
      >
        Roll
      </button>
      <button
        className={`btn-reset ${!win ? "hidden" : ""}`}
        id="reset-btn"
        onClick={resetGame}
      >
        Reset Game
      </button>
      <div
        className={`score ${!win ? "hidden" : ""}`}
        id="reset-btn"
      >
        <p>{count < allTimeRecord ? "New Record! Congrats" : "Round Score"}</p>
        <span>{count < allTimeRecord ? `\uD83D\uDE80` : ""} {count}</span>
        <p>{count < allTimeRecord ? "Previous Record" : "World Record"}</p>
        <span>{count < allTimeRecord ? "" : `\uD83D\uDE80` } {allTimeRecord || 0}</span>
      </div>
      
    </div>
  );
}

export default App;
