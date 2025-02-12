import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentList } from './CommentList';

export default {
	title: 'entities/Comment/CommentList',
	component: CommentList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
	<CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
	comments: [
		{
			id: '1',
			user: { id: '1', username: 'Admin' },
			text: 'Комментарий',
		},
		{
			id: '2',
			user: { id: '2', username: 'User' },
			text: 'Комментарий',
		},
	],
};

export const isLoading = Template.bind({});
isLoading.args = {
	comments: [
		{
			id: '1',
			user: { id: '1', username: 'Admin' },
			text: 'Комментарий',
		},
		{
			id: '2',
			user: { id: '2', username: 'User' },
			text: 'Комментарий',
		},
	],
	isLoading: true,
};
