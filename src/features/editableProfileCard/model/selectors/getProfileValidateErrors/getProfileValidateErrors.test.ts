import { StateSchema } from "app/providers/StoreProvider";
import { getProfileValidateErrors } from "./getProfileValidateErrors";
import { ValidateProfileErrors } from "../../consts/consts";

describe('getProfileValidateErrors.test', () => {
	test('should work with filled state', () => {

		const state: DeepPartial<StateSchema> = {
			profile: {
				validateErrors: [
					ValidateProfileErrors.SERVER_ERROR,
					ValidateProfileErrors.INCORRECT_USER_DATA,
				]
			}
		}
		expect(getProfileValidateErrors(state as StateSchema)).toEqual([
			ValidateProfileErrors.SERVER_ERROR,
			ValidateProfileErrors.INCORRECT_USER_DATA,
		]);
	});

	test('should work with empty value', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
	});
});