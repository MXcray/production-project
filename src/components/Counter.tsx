import {useState} from "react";
import classes from './Counter.module.scss';

export const Counter = () => {

	const [state, setState] = useState(0);

	const increment = () => {
		setState(state + 1);
	}

	const decrement = () => {
		state > 0 ? setState(state - 1) : '';
	}

	return (
			<div className={classes.btn}>
				<h1>{state}</h1>
				<button onClick={increment}>increment</button>
				<button onClick={decrement}>decrement</button>
			</div>
	)
}