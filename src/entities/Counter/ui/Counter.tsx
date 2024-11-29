import { Button } from "@/shared/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { counterActions, useCounterActions } from "../model/slice/CounterSlice";
import { useCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import { useTranslation } from "react-i18next";

export const Counter = () => {

	const dispatch = useDispatch();
	const counterValue = useCounterValue();
	const { t } = useTranslation();

	const {
		increment,
		decrement,
		add
	} = useCounterActions();

	const handleIncrement = () => {
		increment();
	}
	const handleDecrement = () => {
		decrement();
	}

	const handleAddFive = () => {
		add(5);
	}

	return (
		<div>
			<h1 data-testid="value-title">{counterValue}</h1>
			<Button
				onClick={handleAddFive}
				data-testid="increment-btn5">
				{t('add5')}
			</Button>
			<Button
				onClick={handleIncrement}
				data-testid="increment-btn">
				{t('increment')}
			</Button>
			<Button
				onClick={handleDecrement}
				data-testid="decrement-btn">
				{t('decrement')}
			</Button>
		</div>
	);
};