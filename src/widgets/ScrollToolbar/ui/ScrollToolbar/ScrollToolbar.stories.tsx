import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ScrollToolbar } from './ScrollToolbar';

export default {
	title: 'shared/ScrollToolbar',
	component: ScrollToolbar,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ScrollToolbar>;

const Template: ComponentStory<typeof ScrollToolbar> = (args) => (
	/* eslint-disable react/jsx-props-no-spreading */
	<ScrollToolbar {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
