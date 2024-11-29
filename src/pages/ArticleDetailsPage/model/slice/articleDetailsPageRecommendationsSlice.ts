import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { StateSchema } from "@/app/providers/StoreProvider";
import { Article } from "@/entities/Article";
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';
import {
	fetchArticleRecommendations
} from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";

const initialState: ArticleDetailsRecommendationsSchema = {
	error: undefined,
	isLoading: false,
	ids: [],
	entities: {}
};

const recommendationsAdapter = createEntityAdapter<Article>({
	selectId: (article) => article.id,
})

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
	(state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState())


export const articleDetailsPageRecommendationsSlice = createSlice({
	name: 'articleDetailsPageRecommendationsSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticleRecommendations.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticleRecommendations.fulfilled, (
				state,
				action
			) => {
				state.isLoading = false;
				recommendationsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchArticleRecommendations.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
	}
})

export const {
	actions: articleDetailsPageRecommendationsActions
} = articleDetailsPageRecommendationsSlice;

export const {
	reducer: articleDetailsPageRecommendationsReducer
} = articleDetailsPageRecommendationsSlice;