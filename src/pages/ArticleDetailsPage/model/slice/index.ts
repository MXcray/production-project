import { combineReducers } from "@reduxjs/toolkit";
import { ArticleDetailsPageSchema } from "../types";
import {
	articleDetailsPageRecommendationsReducer
} from "../../model/slice/articleDetailsPageRecommendationsSlice";
import { articleDetailsCommentReducer } from "../../model/slice/articleDetailsCommentSlice";

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
	comments: articleDetailsCommentReducer,
	recommendations: articleDetailsPageRecommendationsReducer,
})