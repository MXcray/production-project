import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlePage } from '@/pages/ArticlesPage';
import { ArticleDetails } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { UserRole } from '@/entities/User';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
	AppRoutes,
	getRouteAbout,
	getRouteAdmin,
	getRouteArticleCreate,
	getRouteArticleDetails,
	getRouteArticleEdit,
	getRouteArticles,
	getRouteForbidden,
	getRouteMain,
	getRouteProfile,
	getRouteSettings,
} from '@/shared/const/router';
import { appRoutesProps } from '@/shared/types/router';
import { SettingsPage } from '@/pages/SettingsPage';

export const routeConfig: Record<AppRoutes, appRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <MainPage />,
	},
	[AppRoutes.SETTINGS]: {
		path: getRouteSettings(),
		element: <SettingsPage />,
	},
	[AppRoutes.ABOUT]: {
		path: getRouteAbout(),
		element: <AboutPage />,
	},
	[AppRoutes.PROFILE]: {
		path: getRouteProfile(':id'),
		element: <ProfilePage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLES]: {
		path: getRouteArticles(),
		element: <ArticlePage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLE_DETAILS]: {
		path: getRouteArticleDetails(':id'),
		element: <ArticleDetails />,
		authOnly: true,
	},
	[AppRoutes.ARTICLE_EDIT]: {
		path: getRouteArticleCreate(),
		element: <ArticleEditPage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLE_CREATE]: {
		path: getRouteArticleEdit(':id'),
		element: <ArticleEditPage />,
		authOnly: true,
	},
	[AppRoutes.ADMIN_PANEL]: {
		path: getRouteAdmin(),
		element: <AdminPanelPage />,
		authOnly: true,
		roles: [UserRole.ADMIN, UserRole.MANAGER],
	},
	[AppRoutes.FORBIDDEN]: {
		path: getRouteForbidden(),
		element: <ForbiddenPage />,
	},
	//last
	[AppRoutes.NOT_FOUND]: {
		path: '*',
		element: <NotFoundPage />,
	},
};
