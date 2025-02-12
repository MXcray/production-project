import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';
import { Modal } from './Modal';

export default {
	title: 'shared/Modal',
	component: Modal,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Light = Template.bind({});
Light.args = {
	isOpen: true,
	children:
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, vitae.',
};

export const Dark = Template.bind({});
Dark.args = {
	isOpen: true,
	children:
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, vitae.',
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
