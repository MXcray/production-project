import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Loader } from "./Loader";

export default {
	title: 'shared/Loader',
	component: Loader,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Light = Template.bind({});
Light.args = {

};

export const Dark = Template.bind({});
Dark.args = {

};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
