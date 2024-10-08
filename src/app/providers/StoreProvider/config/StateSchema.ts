import { CounterSchema } from "entities/Counter";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername";
import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { ProfileSchema } from "entities/Profile";
import { AxiosInstance } from "axios";
import { To } from "history";
import { NavigateOptions } from "react-router";
import { ArticleDetailsSchema } from "entities/Article";
import { ArticleDetailsCommentSchema, ArticleDetailsRecommendationsSchema } from "pages/ArticleDetailsPage";
import { AddNewCommentSchema } from "features/addNewCommnt";
import { ArticlesPageSchema } from "pages/ArticlesPage";
import { UISchema } from "features/UI";
import { ArticleDetailsPageSchema } from "pages/ArticleDetailsPage/model/types";

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	ui: UISchema;
	// Асинхронные редюсеры
	profile?: ProfileSchema;
	loginForm?: LoginSchema;
	articleDetails?: ArticleDetailsSchema;
	addNewComment?: AddNewCommentSchema;
	articlesPage?: ArticlesPageSchema;
	articleDetailsPage?: ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
	// true - вмонтирован, false - демонтирован
	getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}