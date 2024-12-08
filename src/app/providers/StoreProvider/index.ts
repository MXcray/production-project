import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore, AppDispatch } from './config/store';
import type {
	ReduxStoreWithManager,
	StateSchema,
	StateSchemaKey,
	ThunkConfig,
} from './config/StateSchema';

export {
	StoreProvider,
	createReduxStore,
	type StateSchema,
	type StateSchemaKey,
	type ReduxStoreWithManager,
	type AppDispatch,
	type ThunkConfig,
};
