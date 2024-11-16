import { validateProfileData } from "./validateProfileData";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";

import { ValidateProfileErrors } from "../../consts/consts";

const data = {
	username: 'admin',
	lastname: 'qwerty',
	country: Country.Russia,
	first: 'ytrewq',
	age: 21,
	currency: Currency.RUB,
	city: 'Izhevsk'
}

describe('validateProfileData.test', () => {

	test('success', () => {
		const result = validateProfileData(data);

		expect(result).toEqual([]);
	});

	test('without first and last name',  () => {
		const result = validateProfileData({ ...data, first: '' ,lastname: '' });

		expect(result).toEqual([
			ValidateProfileErrors.INCORRECT_USER_DATA,
		]);
	});

	test('incorrect age',  () => {
		const result = validateProfileData({ ...data, age: undefined });

		expect(result).toEqual([
			ValidateProfileErrors.INCORRECT_AGE,
		]);
	});

	test('incorrect country',  () => {
		const result = validateProfileData({ ...data, country: undefined });

		expect(result).toEqual([
			ValidateProfileErrors.INCORRECT_COUNTRY,
		]);
	});

	test('incorrect country',  () => {
		const result = validateProfileData({});

		expect(result).toEqual([
			ValidateProfileErrors.INCORRECT_USER_DATA,
			ValidateProfileErrors.INCORRECT_AGE,
			ValidateProfileErrors.INCORRECT_COUNTRY,
		]);
	});
});