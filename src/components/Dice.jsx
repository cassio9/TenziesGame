function Dice(props) {
	// Layout dice HTML
	const { diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix } = DiceHTMLStructure();

	// Render Dice
	let { classRender, diceRender } = RenderDice();

	return (
		<div
			className={`${classRender}-face dice`}
			style={{
				backgroundColor: props.on ? "#2ecc71" : "wheat",
				border: props.on ? "3px solid #2ecc71" : "3px solid wheat",
			}}
			onClick={props.StopRoll}>
			{diceRender}
		</div>
	);

	function RenderDice() {
		let diceRender;
		let classRender;
		switch (props.num) {
			case 1:
				diceRender = diceOne;
				classRender = "first";
				break;
			case 2:
				diceRender = diceTwo;
				classRender = "second";
				break;
			case 3:
				diceRender = diceThree;
				classRender = "third";
				break;
			case 4:
				diceRender = diceFour;
				classRender = "fourth";
				break;
			case 5:
				diceRender = diceFive;
				classRender = "fifth";
				break;
			case 6:
				diceRender = diceSix;
				classRender = "sixth";
				break;
		}
		return { classRender, diceRender };
	}

	function DiceHTMLStructure() {
		const diceOne = (
			<>
				<span className="dot"></span>
			</>
		);
		const diceTwo = (
			<>
				<span className="dot"></span>
				<span className="dot"></span>
			</>
		);
		const diceThree = (
			<>
				<span className="dot"></span>
				<span className="dot"></span>
				<span className="dot"></span>
			</>
		);
		const diceFour = (
			<>
				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
				</div>
				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
				</div>
			</>
		);
		const diceFive = (
			<>
				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
				</div>
				<div className="column">
					<span className="dot"></span>
				</div>
				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
				</div>
			</>
		);

		const diceSix = (
			<>
				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
					<span className="dot"></span>
				</div>
				<div className="column">
					<span className="dot"></span>
					<span className="dot"></span>
					<span className="dot"></span>
				</div>
			</>
		);
		return { diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix };
	}
}

export default Dice;
