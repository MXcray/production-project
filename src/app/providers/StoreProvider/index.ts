import { StoreProvider } from "./ui/StoreProvider";
import { createReduxStore, AppDispatch } from "./config/store";
import type { ReduxStoreWithManager, StateSchema, ThunkConfig } from './config/StateSchema'

export {
	StoreProvider,
	createReduxStore,
	type StateSchema,
	type ReduxStoreWithManager,
	type AppDispatch,
	type ThunkConfig
}