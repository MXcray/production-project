import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Text, TextSize, TextTheme } from "./Text";
import { Theme } from "@/shared/const/theme";

export default {
	title: 'shared/Text',
	component: Text,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	title: 'Text lorem ipsum',
	text: 'Description Description Description Description'
};

export const Error = Template.bind({});
Error.args = {
	title: 'Text lorem ipsum',
	text: 'Description Description Description Description',
	theme: TextTheme.ERROR
};
export const onlyTitle = Template.bind({});
onlyTitle.args = {
	title: 'Text lorem ipsum',
};

export const onlyText = Template.bind({});
onlyText.args = {
	text: 'Description Description Description Description'
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
	title: 'Text lorem ipsum',
	text: 'Description Description Description Description'
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
	title: 'Text lorem ipsum',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
	text: 'Description Description Description Description'
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeS = Template.bind({});
SizeS.args = {
	title: 'Text lorem ipsum',
	text: 'Description Description Description Description',
	size: TextSize.S,
};

export const SizeM = Template.bind({});
SizeM.args = {
	title: 'Text lorem ipsum',
	text: 'Description Description Description Description',
	size: TextSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
	title: 'Text lorem ipsum',
	text: 'Description Description Description Description',
	size: TextSize.L,
};
