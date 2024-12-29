import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import MainIconDeprecated from '@/shared/assets/icons/main.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile.svg';
import ArticlesIconDeprecated from '@/shared/assets/icons/articles.svg';

import MainIcon from '@/shared/assets/icons/main-new.svg';
import AboutIcon from '@/shared/assets/icons/about-new.svg';
import ProfileIcon from '@/shared/assets/icons/profile-new.svg';
import ArticlesIcon from '@/shared/assets/icons/articles-new.svg';

import { SidebarItemType } from '../types/sidebar';
import {
	getRouteAbout,
	getRouteArticles,
	getRouteMain,
	getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
	const sidebarItemsList: SidebarItemType[] = [
		{
			text: 'Главная',
			path: getRouteMain(),
			Icon: toggleFeatures({
				name: 'isAppRedesigned',
				off: () => MainIconDeprecated,
				on: () => MainIcon,
			}),
		},
		{
			text: 'О сайте',
			path: getRouteAbout(),
			Icon: toggleFeatures({
				name: 'isAppRedesigned',
				off: () => AboutIconDeprecated,
				on: () => AboutIcon,
			}),
		},
	];

	if (userData) {
		sidebarItemsList.push(
			{
				text: 'Профиль',
				path: getRouteProfile(userData.id),
				Icon: toggleFeatures({
					name: 'isAppRedesigned',
					off: () => ProfileIconDeprecated,
					on: () => ProfileIcon,
				}),
				authOnly: true,
			},
			{
				text: 'Статьи',
				path: getRouteArticles(),
				Icon: toggleFeatures({
					name: 'isAppRedesigned',
					off: () => ArticlesIconDeprecated,
					on: () => ArticlesIcon,
				}),
				authOnly: true,
			},
		);
	}

	return sidebarItemsList;
});
