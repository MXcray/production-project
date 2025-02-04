import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import { profileActions, profileReducer } from '../../model/slice/ProfileSlice';
import { ProfileCard } from '@/entities/Profile';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { EditableProfileCardHeader } from '../../ui/EditableProfileCardHeader/EditableProfileCardHeader';
import { VStack } from '@/shared/ui/redesigned/stack';
import { ValidateProfileErrors } from '../../model/consts/consts';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface EditableProfileCardProps {
	className?: string;
	id?: string;
}

const reducers: ReducersList = {
	profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
	const { className, id } = props;
	const { t } = useTranslation('profile');
	const dispatch = useAppDispatch();
	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadOnly);
	const validateErrors = useSelector(getProfileValidateErrors);

	const validateErrorTranslates = {
		[ValidateProfileErrors.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
		[ValidateProfileErrors.INCORRECT_COUNTRY]: t('Некоректнаый регион'),
		[ValidateProfileErrors.INCORRECT_AGE]: t('Некоректный возраст'),
		[ValidateProfileErrors.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
		[ValidateProfileErrors.NO_DATA]: t('Данные не указаны'),
	};

	useInitialEffect(() => {
		if (id) {
			dispatch(fetchProfileData(id));
		}
	});

	const onChangeFirstname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ first: value || '' }));
		},
		[dispatch],
	);

	const onChangeLastname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ lastname: value || '' }));
		},
		[dispatch],
	);

	const onChangeAge = useCallback(
		(value?: string) => {
			if (/^\d{0,3}$/.test(value as string)) {
				dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
			}
		},
		[dispatch],
	);

	const onChangeCity = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ city: value || '' }));
		},
		[dispatch],
	);

	const onChangeUsername = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ username: value || '' }));
		},
		[dispatch],
	);

	const onChangeAvatar = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ avatar: value || '' }));
		},
		[dispatch],
	);

	const onChangeCurrency = useCallback(
		(currency?: Currency) => {
			dispatch(profileActions.updateProfile({ currency }));
		},
		[dispatch],
	);

	const onChangeCountry = useCallback(
		(country?: Country) => {
			dispatch(profileActions.updateProfile({ country }));
		},
		[dispatch],
	);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<VStack gap={'8'} max className={classNames('', {}, [className])}>
				<EditableProfileCardHeader />
				{validateErrors?.length &&
					validateErrors.map((err: ValidateProfileErrors) => {
						return (
							<ToggleFeatures
								feature={'isAppRedesigned'}
								on={
									<Text
										variant={'error'}
										bold
										text={validateErrorTranslates[err]}
										key={err}
										data-testid={'EditableProfileCard.Error'}
									/>
								}
								off={
									<TextDeprecated
										theme={TextTheme.ERROR}
										text={validateErrorTranslates[err]}
										key={err}
										data-testid={'EditableProfileCard.Error'}
									/>
								}
							/>
						);
					})}
				<ProfileCard
					data={formData}
					isLoading={isLoading}
					error={error}
					readonly={readonly}
					onChangeFirstname={onChangeFirstname}
					onChangeLastname={onChangeLastname}
					onChangeAge={onChangeAge}
					onChangeCity={onChangeCity}
					onChangeUsername={onChangeUsername}
					onChangeAvatar={onChangeAvatar}
					onChangeCurrency={onChangeCurrency}
					onChangeCountry={onChangeCountry}
				/>
			</VStack>
		</DynamicModuleLoader>
	);
});
