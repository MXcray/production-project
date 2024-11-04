import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { loginReducer } from "features/AuthByUsername/model/slice/loginSlice";
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice";
import { addNewCommentReducer } from "features/addNewCommnt/model/slices/addNewCommentSlice";
import { articleDetailsPageReducer } from "pages/ArticleDetailsPage/model/slice";
import { profileReducer } from "features/editableProfileCard/model/slice/ProfileSlice";

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