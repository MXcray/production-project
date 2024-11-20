import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import LoginForm from "./LoginForm";
import { StoreDecorator } from "@/shared/config/storybook/storeDecorator/StoreDecorator";

export default {
	title: 'features/LoginForm',
	component: LoginForm,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({
	loginForm: {
		username: '123',
		password: '312'
	}
})]

export const isLoading = Template.bind({});
isLoading.args = {};
isLoading.decorators = [StoreDecorator({
	loginForm: {
		isLoading: true,
	}
})]

export const withError = Template.bind({});
withError.args = {};
withError.decorators = [StoreDecorator({
	loginForm: {
		username: '123',
		password: '312',
		error: 'error'
	}
})]

// export const Dark = Template.bind({});
// Dark.args = {};
// Dark.decorators = [ThemeDecorator(Theme.DARK)];
