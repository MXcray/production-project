import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/storybook.jpeg';

export default {
	title: 'entities/ProfileCard',
	component: ProfileCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
	<ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	data: {
		username: 'admin',
		lastname: 'qwerty',
		country: Country.Russia,
		first: 'ytrewq',
		age: 21,
		currency: Currency.RUB,
		avatar: avatar,
		city: 'Izhevsk',
	},
};

export const isLoading = Template.bind({});
isLoading.args = {
	isLoading: true,
};

export const withError = Template.bind({});
withError.args = {
	error: 'true',
};
