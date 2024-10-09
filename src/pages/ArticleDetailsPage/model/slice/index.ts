import { combineReducers } from "@reduxjs/toolkit";
import { ArticleDetailsPageSchema } from "pages/ArticleDetailsPage";
import {
	articleDetailsPageRecommendationsReducer
} from "pages/ArticleDetailsPage/model/slice/articleDetailsPageRecommendationsSlice";
import { articleDetailsCommentReducer } from "pages/ArticleDetailsPage/model/slice/articleDetailsCommentSlice";

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
	comments: articleDetailsCommentReducer,
	recommendations: articleDetailsPageRecommendationsReducer,
})