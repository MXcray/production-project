import { counterReducer, counterActions } from "./CounterSlice";
import { DeepPartial } from "@reduxjs/toolkit";
import { CounterSchema } from "../types/counterSchema";

describe('CounterSlice', () => {
	test('increment', () => {
		const state: DeepPartial<CounterSchema> = {
			value: 10
		}
		expect(counterReducer(state as CounterSchema, counterActions.increment())).toEqual({ value: 11 })
	});

	test('decrement', () => {
		const state: DeepPartial<CounterSchema> = {
			value: 10
		}
		expect(counterReducer(state as CounterSchema, counterActions.decrement())).toEqual({ value: 9 })
	});

	test('empty state', () => {
		expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 })
	});

});