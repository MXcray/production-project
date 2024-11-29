import { Story } from "@storybook/react";
import { Theme } from "@/shared/const/theme";
// eslint-disable-next-line anton-plugin/layer-imports
import { ThemeProvider } from "@/app/providers/ThemeProvider";

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => { //замыкание
	return (
		<ThemeProvider initialTheme={theme}>
			<div className={`app ${theme}`}>
				<StoryComponent />
			</div>
		</ThemeProvider>
	);
}