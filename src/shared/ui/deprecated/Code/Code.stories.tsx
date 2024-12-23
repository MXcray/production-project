import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Code } from './Code';

export default {
	title: 'shared/Code',
	component: Code,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	text:
		"import React from 'react';\n" +
		"import { ComponentStory, ComponentMeta } from '@storybook/react';\n" +
		'\n' +
		"import { Code } from './Code';\n" +
		'\n' +
		'export default {\n' +
		"\ttitle: 'shared/Code',\n" +
		'\tcomponent: Code,\n' +
		'\targTypes: {\n' +
		"\t\tbackgroundColor: { control: 'color' },\n" +
		'\t},\n' +
		'} as ComponentMeta<typeof Code>;\n' +
		'\n' +
		'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;',
};
