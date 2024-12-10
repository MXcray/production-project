import { userReducer, userActions } from './model/slice/userSlice';
import { User, UserSchema } from './model/types/user';
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { getUserInited } from './model/selectors/getUserInited/getUserInited';
import {
	getUserRoles,
	isUserAdmin,
	isUserManager,
} from './model/selectors/roleSelector';
import { UserRole } from './model/consts/userConsts';
import { useJsonSettings } from './model/selectors/jsonSettings';
import { saveJsonSettings } from './model/services/saveJsonSettings';
import { initAuthData } from './model/services/initAuthData';

export {
	userReducer,
	userActions,
	type User,
	type UserSchema,
	UserRole,
	getUserAuthData,
	getUserInited,
	isUserAdmin,
	isUserManager,
	getUserRoles,
	useJsonSettings,
	saveJsonSettings,
	initAuthData,
};
