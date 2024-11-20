import { EditableProfileCard } from "./EditableProfileCard";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";
import { Profile } from "@/entities/Profile";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country";
import { profileReducer } from "../../model/slice/ProfileSlice";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { $api } from "@/shared/api/api";

const profile: Profile = {
	id: '1',
	first: 'admin',
	lastname: 'admin',
	age: 465,
	currency: Currency.USD,
	country: Country.Kazakhstan,
	city: 'Moscow',
	username: 'admin123',
};

const options = {
	initialState: {
		profile: {
			readonly: true,
			data: profile,
			form: profile,
		},
		user: {
			authData: {
				id: '1',
				username: 'admin',
			}
		}
	},
	asyncReducers: {
		profile: profileReducer,
	},
}

describe('features/EditableProfileCard',() => {
	test('Режим рид онли должен переключиться', async() => {
		componentRender(<EditableProfileCard id={'1'}/>, options)

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
	});

	test('При отмене значения должны обнуляться', async() => {
		componentRender(<EditableProfileCard id={'1'}/>, options)

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton')); //нажали редактировать
		await userEvent.clear(screen.getByTestId('ProfileCard.firstname')); //удалили значение
		await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'some new value'); //написали новое
		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('some new value'); //проверили что записалось
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton')); //отменили
		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue(profile.first); // поле осталось как было
	});

	test('Должна появиться ошибка', async() => {
		componentRender(<EditableProfileCard id={'1'}/>, options)

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
		expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
	});

	test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async() => {
		const mockPutReq = jest.spyOn($api, 'put');

		componentRender(<EditableProfileCard id={'1'}/>, options)

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
		expect(mockPutReq).toHaveBeenCalled();
	});
});