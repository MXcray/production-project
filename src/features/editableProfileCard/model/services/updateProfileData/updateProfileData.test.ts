import { updateProfileData } from './updateProfileData';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { ValidateProfileErrors } from '../../consts/consts';

const data = {
	id: '1',
	username: 'admin',
	lastname: 'qwerty',
	country: Country.Russia,
	first: 'ytrewq',
	age: 21,
	currency: Currency.RUB,
	city: 'Izhevsk',
};

describe('updateProfileData.test', () => {
	test('success', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data,
			},
		});
		thunk.api.put.mockReturnValue(Promise.resolve({ data: data }));
		const result = await thunk.callThunk();

		expect(thunk.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('error', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data,
			},
		});

		thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual([ValidateProfileErrors.SERVER_ERROR]);
	});

	test('validate error', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: { ...data, lastname: '' },
			},
		});

		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual([ValidateProfileErrors.INCORRECT_USER_DATA]);
	});
});
