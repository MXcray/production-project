import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';

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

export const Normal = Template.bind({});
Normal.args = {
	comment: {
		id: '1',
		user: { id: '1', username: 'Admin' },
		text: 'Коментарий',
	},
};

export const isLoading = Template.bind({});
isLoading.args = {
	comment: {
		id: '1',
		user: { id: '1', username: 'Admin' },
		text: 'Коментарий',
	},
	isLoading: true,
};
