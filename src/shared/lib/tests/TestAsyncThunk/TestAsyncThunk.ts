import { StateSchema } from '@/app/providers/StoreProvider';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';

type ActionCreatorType<Returned, Arg, RejectedValue> = (
	arg: Arg,
) => AsyncThunkAction<Returned, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Returned, Arg, RejectedValue> {
	dispatch: jest.MockedFn<any>;
	getState: () => StateSchema;
	actionCreator: ActionCreatorType<Returned, Arg, RejectedValue>;
	api: jest.MockedFunctionDeep<AxiosStatic>;
	navigate: jest.MockedFn<any>;

	constructor(
		actionCreator: ActionCreatorType<Returned, Arg, RejectedValue>,
		state?: DeepPartial<StateSchema>,
	) {
		this.actionCreator = actionCreator;
		this.dispatch = jest.fn();
		this.getState = jest.fn(() => state as StateSchema);

		this.api = mockedAxios;
		this.navigate = jest.fn();
	}

	async callThunk(arg: Arg) {
		const action = this.actionCreator(arg);
		const result = await action(this.dispatch, this.getState, {
			api: this.api,
			navigate: this.navigate,
		});

		return result;
	}
}
