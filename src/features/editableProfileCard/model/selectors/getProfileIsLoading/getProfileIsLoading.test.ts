import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileForm.test', () => {
	test('should work with filled state', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				isLoading: true,
			},
		};
		expect(getProfileIsLoading(state as StateSchema)).toEqual(true);
	});

	test('should work with empty value', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileIsLoading(state as StateSchema)).toEqual(undefined);
	});
});
