import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import ProfilePage from "./ProfilePage";
import { StoreDecorator } from "@/shared/config/storybook/storeDecorator/StoreDecorator";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import avatar from "@/shared/assets/tests/storybook.jpeg";
import { Theme } from "@/shared/const/theme";

export default {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfilePage>;

//@ts-ignore
const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
	profile: {
		form: {
			username: 'admin',
			lastname: 'qwerty',
			country: Country.Russia,
			first: 'ytrewq',
			age: 21,
			currency: Currency.RUB,
			avatar: avatar,
			city: 'Izhevsk'
		}
	}
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
	profile: {
		form: {
			username: 'admin',
			lastname: 'qwerty',
			country: Country.Russia,
			first: 'ytrewq',
			age: 21,
			currency: Currency.RUB,
			avatar: avatar,
			city: 'Izhevsk'
		}
	}
})];
