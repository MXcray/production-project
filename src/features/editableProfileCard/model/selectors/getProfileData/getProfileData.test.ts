import { StateSchema } from "@/app/providers/StoreProvider";
import { getProfileData } from "./getProfileData";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";

describe('getProfileData.test', () => {
	test('should return data', () => {

		const data = {
			username: 'admin',
			lastname: 'qwerty',
			country: Country.Russia,
			first: 'ytrewq',
			age: 21,
			currency: Currency.RUB,
			city: 'Izhevsk'
		};

		const state: DeepPartial<StateSchema> = {
			profile: {
				data: data
			}
		}
		expect(getProfileData(state as StateSchema)).toEqual(data);
	});

	test('should work with empty value', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getProfileData(state as StateSchema)).toEqual(undefined);
	});
});