import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { ProfileSchema } from "../types/editableProfileCardSchema";
import { profileActions, profileReducer } from "./ProfileSlice";
import { ValidateProfileErrors } from "../../model/consts/consts";

const data = {
	username: 'admin',
	lastname: 'qwerty',
	country: Country.Russia,
	first: 'ytrewq',
	age: 21,
	currency: Currency.RUB,
	city: 'Izhevsk'
}

describe('ProfileSlice.test', () => {
	test('test set readonly', () => {
		const state: DeepPartial<ProfileSchema> = { readonly: true };
		expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(false)))
			.toEqual({ readonly: false });
	});

	test('test cancel edit', () => {
		const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };
		expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit()))
			.toEqual({
				readonly: true,
				validateErrors: undefined,
				data,
				form: data
			});
	});

	test('test update profile', () => {
		const state: DeepPartial<ProfileSchema> = { form:{ username: 'admin' } };
		expect(profileReducer(state as ProfileSchema, profileActions.updateProfile( { username: '123' } )))
			.toEqual({
				form: { username: '123' }
			});
	});

	test('test update profile service pending', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: false,
			validateErrors: [ValidateProfileErrors.SERVER_ERROR]
		};
		expect(profileReducer(state as ProfileSchema, updateProfileData.pending))
			.toEqual({
				isLoading: true,
				validateErrors: undefined,
			});
	});

	test('test update profile service fulfilled', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: true,
			validateErrors: [ValidateProfileErrors.SERVER_ERROR],
			readonly: false,
			data,
			form: data

		};
		expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, '')))
			.toEqual({
				isLoading: false,
				validateErrors: undefined,
				readonly: true,
				form: data,
				data,
			});
	});
});