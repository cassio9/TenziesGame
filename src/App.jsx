import { useEffect, useState } from "react";
import Dice from "./components/Dice";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import useWindowSize from "./hooks/ConfettiSize";
import "./App.css";

function App() {
	const allTimeRecord = Number(localStorage.getItem("RecordTenzies") || 50);
	//localStorage.removeItem("RecordTenzies");
	const [randomNumbers, setRandomNumbers] = useState(allNewDice);
	const [win, setWin] = useState(false);
	const [count, setCount] = useState(0);
	const { width, height } = useWindowSize();

	function getNewDice() {
		return {
			number: Math.floor(Math.random() * 6 + 1),
			on: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		let newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(getNewDice());
		}
		return newDice;
	}

	function rollDice() {
		setRandomNumbers((prevState) =>
			prevState.map((dice) => {
				return dice.on ? dice : { ...dice, number: Math.floor(Math.random() * 6) + 1 };
			})
		);
		setCount((prevState) => prevState + 1);
	}

	function SelectNumber(id) {
		setRandomNumbers((prevState) =>
			prevState.map((elem) => {
				return elem.id === id ? { ...elem, on: !elem.on } : elem;
			})
		);
	}

	function resetGame() {
		setRandomNumbers(allNewDice);
		setWin(false);
		setCount(0);
	}

	useEffect(() => {
		const allHeld = randomNumbers.every((die) => die.on);
		const firstValue = randomNumbers[0].number;
		const allSameValue = randomNumbers.every((die) => die.number === firstValue);
		if (allHeld && allSameValue) {
			setWin(true);
			// put delay into this "if statement", in order to Winner record render the proper value
			setTimeout(() => {
				if (count < allTimeRecord || !allTimeRecord) {
					localStorage.setItem("RecordTenzies", count);
				}
			}, 100);
		}
		return () => clearTimeout();
	}, [randomNumbers]);

	const DiceGame = randomNumbers.map((elem) => {
		return (
			<Dice num={elem.number} key={elem.id} on={elem.on} StopRoll={() => SelectNumber(elem.id)} />
		);
	});

	return (
		<div className="App">
			{win && <Confetti width={width} height={height} numberOfPieces={500} />}
			<h1 className="main-title">Tenzies</h1>
			<p className="main-p">
				Roll until all dice are the same. Click each die to freeze it at its current value between
				rolls.
			</p>
			<div className="board-container">{DiceGame}</div>
			<button className={`btn ${win ? "hidden" : ""}`} id="play-btn" onClick={rollDice}>
				Roll
			</button>
			<button className={`btn-reset ${!win ? "hidden" : ""}`} id="reset-btn" onClick={resetGame}>
				Reset Game
			</button>
			<div className={`score ${!win ? "hidden" : ""}`} id="reset-btn">
				<p>{count < allTimeRecord ? "New Record! Congrats" : "Round Score"}</p>
				<span>
					{count < allTimeRecord ? `\uD83D\uDE80` : ""} {count}
				</span>
				<p>{count < allTimeRecord ? "Previous Record" : "World Record"}</p>
				<span>
					{count < allTimeRecord ? "" : `\uD83D\uDE80`} {allTimeRecord || 0}
				</span>
			</div>
		</div>
	);
}

export default App;
