import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import AppRouter from './AppRouter';
import {
	getRouteAbout,
	getRouteAdmin,
	getRouteProfile,
} from '@/shared/const/router';
import { screen } from '@testing-library/react';
import { UserRole } from '@/entities/User';

describe('app/router/AppRouter', function () {
	test('Страница должна отрендериться', async () => {
		componentRender(<AppRouter />, {
			route: getRouteAbout(),
		});

		const page = await screen.findByTestId('AboutPage');
		expect(page).toBeInTheDocument();
	});

	test('Страница не найдена', async () => {
		componentRender(<AppRouter />, {
			route: '/awdawdawd',
		});

		const page = await screen.findByTestId('NotFoundPage');
		expect(page).toBeInTheDocument();
	});

	test('Редирект неавторизованного пользователя на главную', async () => {
		componentRender(<AppRouter />, {
			route: getRouteProfile('1'),
		});

		const page = await screen.findByTestId('MainPage');
		expect(page).toBeInTheDocument();
	});

	test('Доступ к закрытой странице для авторизованного пользователя', async () => {
		componentRender(<AppRouter />, {
			route: getRouteProfile('1'),
			initialState: {
				user: {
					_inited: true,
					authData: {},
				},
			},
		});

		const page = await screen.findByTestId('ProfilePage');
		expect(page).toBeInTheDocument();
	});

	test('Доступ запрещен (отсутсвует роль)', async () => {
		componentRender(<AppRouter />, {
			route: getRouteAdmin(),
			initialState: {
				user: {
					_inited: true,
					authData: {},
				},
			},
		});

		const page = await screen.findByTestId('ForbiddenPage');
		expect(page).toBeInTheDocument();
	});

	test('Доступ разрешен (пристутсвует роль)', async () => {
		componentRender(<AppRouter />, {
			route: getRouteAdmin(),
			initialState: {
				user: {
					_inited: true,
					authData: {
						roles: [UserRole.ADMIN],
					},
				},
			},
		});

		const page = await screen.findByTestId('AdminPanelPage');
		expect(page).toBeInTheDocument();
	});
});
