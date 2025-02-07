import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

export default {
	title: 'entities/Comment/CommentCard',
	component: CommentCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
	<CommentCard {...args} />
);

const normalArgs = {
	comment: {
		id: '1',
		user: { id: '1', username: 'Admin' },
		text: 'Коментарий',
	},
};

export const Normal = Template.bind({});
Normal.args = normalArgs;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [
	FeaturesFlagsDecorator({ isAppRedesigned: true }),
];

export const isLoading = Template.bind({});
isLoading.args = {
	comment: {
		id: '1',
		user: { id: '1', username: 'Admin' },
		text: 'Коментарий',
	},
	isLoading: true,
};
