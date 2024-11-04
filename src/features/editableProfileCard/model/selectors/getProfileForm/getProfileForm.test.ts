import { StateSchema } from "app/providers/StoreProvider";
import { getProfileForm } from "./getProfileForm";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";

describe('getProfileForm.test', () => {
	test('should return form', () => {

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
				form: data
			}
		}
		expect(getProfileForm(state as StateSchema)).toEqual(data);
	});

	test('should work with empty value', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getProfileForm(state as StateSchema)).toEqual(undefined);
	});
});