import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Sidebar } from './Sidebar';
import { StoreDecorator } from '@/shared/config/storybook/storeDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';

export default {
	title: 'widgets/sidebar',
	component: Sidebar,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Sidebar>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof Sidebar> = (args) => (
	<Sidebar {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
	StoreDecorator({
		user: {
			authData: {},
		},
	}),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
	ThemeDecorator(Theme.DARK),
	StoreDecorator({
		user: {
			authData: {},
		},
	}),
];

export const NoAuth = Template.bind({});
NoAuth.args = {};
NoAuth.decorators = [
	StoreDecorator({
		user: {},
	}),
];
