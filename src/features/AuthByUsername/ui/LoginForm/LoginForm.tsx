import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import {
	Button as ButtonDeprecated,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { useSelector } from 'react-redux';
import React, { memo, useCallback } from 'react';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/stack';

export interface LoginFormProps {
	className?: string;
	onSuccess: () => void;
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value));
		},
		[dispatch],
	);

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value));
		},
		[dispatch],
	);

	const onLoginClick = useCallback(async () => {
		const result = await dispatch(loginByUsername({ username, password }));
		if (result.meta.requestStatus === 'fulfilled') {
			onSuccess();
		}
	}, [onSuccess, dispatch, password, username]);

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<div className={classNames(cls.LoginForm, {}, [className])}>
						<Text title={t('Форма авторизации')} align={'center'} />
						{error && (
							<Text text={t('Неверный логин или пароль')} variant={'error'} />
						)}
						<VStack gap={'8'}>
							<Input
								type="text"
								className={cls.input}
								placeholder={t('Введите username')}
								autofocus
								onChange={onChangeUsername}
								value={username}
							/>
							<Input
								type="text"
								className={cls.input}
								placeholder={t('Введите пароль')}
								onChange={onChangePassword}
								value={password}
							/>
						</VStack>
						<Button
							className={cls.loginBtn}
							onClick={onLoginClick}
							disabled={isLoading}
						>
							{t('Войти')}
						</Button>
					</div>
				}
				off={
					<div className={classNames(cls.LoginForm, {}, [className])}>
						<TextDeprecated title={t('Форма авторизации')} />
						{error && (
							<TextDeprecated
								text={t('Неверный логин или пароль')}
								theme={TextTheme.ERROR}
							/>
						)}
						<InputDeprecated
							type="text"
							className={cls.input}
							placeholder={t('Введите username')}
							autofocus
							onChange={onChangeUsername}
							value={username}
						/>
						<InputDeprecated
							type="text"
							className={cls.input}
							placeholder={t('Введите пароль')}
							onChange={onChangePassword}
							value={password}
						/>
						<ButtonDeprecated
							className={cls.loginBtn}
							theme={ButtonTheme.BACKGROUND_INVERTED}
							onClick={onLoginClick}
							disabled={isLoading}
						>
							{t('Войти')}
						</ButtonDeprecated>
					</div>
				}
			/>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
