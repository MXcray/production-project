import { Story } from "@storybook/react";
// TODO
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
// eslint-disable-next-line anton-plugin/public-api-imports
import { loginReducer } from "@/features/AuthByUsername/model/slice/loginSlice";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
// eslint-disable-next-line anton-plugin/public-api-imports
import { articleDetailsReducer } from "@/entities/Article/model/slice/articleDetailsSlice";
// eslint-disable-next-line anton-plugin/public-api-imports
import { addNewCommentReducer } from "@/features/addNewCommnt/model/slices/addNewCommentSlice";
// eslint-disable-next-line anton-plugin/public-api-imports
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage/model/slice";
// eslint-disable-next-line anton-plugin/public-api-imports
import { profileReducer } from "@/features/editableProfileCard/model/slice/ProfileSlice";

const defaultAsyncReducers: ReducersList = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
	addNewComment: addNewCommentReducer,
	articleDetailsPage: articleDetailsPageReducer,
}

export const StoreDecorator = (
	state: DeepPartial<StateSchema>,
	asyncReducers?: ReducersList
) => (StoryComponent: Story) => { //замыкание
	return (
		<StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
			<StoryComponent />
		</StoreProvider>
	);
}