import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { HStack, VStack } from '@/shared/ui/redesigned/stack';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
	Text as TextDeprecated,
	TextAlign,
	TextTheme,
} from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedError = () => {
	const { t } = useTranslation('profile');

	return (
		<HStack
			justify={'center'}
			max
			className={classNames(cls.ProfileCard, {}, [cls.error])}
		>
			<TextDeprecated
				theme={TextTheme.ERROR}
				title={t('Произошла ошибка при загрузке профиля')}
				text={t('Попробуйте перезагрузить страницу')}
				align={TextAlign.CENTER}
			/>
		</HStack>
	);
};

export const ProfileCardDeprecatedSkeleton = () => {
	return (
		<HStack
			justify={'center'}
			max
			className={classNames(cls.ProfileCard, { [cls.loading]: true }, [])}
		>
			<Loader />
		</HStack>
	);
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
	const {
		className,
		data,
		readonly,
		onChangeFirstname,
		onChangeLastname,
		onChangeAge,
		onChangeCity,
		onChangeUsername,
		onChangeAvatar,
		onChangeCurrency,
		onChangeCountry,
	} = props;

	const { t } = useTranslation('profile');

	const mods: Mods = {
		[cls.editing]: !readonly,
	};

	return (
		<VStack
			gap={'8'}
			max
			className={classNames(cls.ProfileCard, mods, [className])}
		>
			{data?.avatar && (
				<HStack justify={'center'} max className={cls.avatarWrapper}>
					<AvatarDeprecated src={data?.avatar} size={150} alt="avatar" />
				</HStack>
			)}
			<InputDeprecated
				value={data?.first}
				placeholder={t('Ваше имя')}
				className={cls.input}
				readonly={readonly}
				onChange={onChangeFirstname}
				data-testid={'ProfileCard.firstname'}
			/>
			<InputDeprecated
				value={data?.lastname}
				placeholder={t('Ваша фамилия')}
				className={cls.input}
				readonly={readonly}
				onChange={onChangeLastname}
				data-testid={'ProfileCard.lastname'}
			/>
			<InputDeprecated
				value={data?.age}
				placeholder={t('Ваш возраст')}
				className={cls.input}
				readonly={readonly}
				onChange={onChangeAge}
			/>
			<InputDeprecated
				value={data?.city}
				placeholder={t('Город')}
				className={cls.input}
				readonly={readonly}
				onChange={onChangeCity}
			/>
			<InputDeprecated
				value={data?.username}
				placeholder={t('Введите имя пользователя')}
				className={cls.input}
				readonly={readonly}
				onChange={onChangeUsername}
			/>
			<InputDeprecated
				value={data?.avatar}
				placeholder={t('Введите ссылку на аватар')}
				className={cls.input}
				readonly={readonly}
				onChange={onChangeAvatar}
			/>
			<CurrencySelect
				value={data?.currency}
				className={cls.input}
				onChange={onChangeCurrency}
				readonly={readonly}
			/>
			<CountrySelect
				value={data?.country}
				className={cls.input}
				onChange={onChangeCountry}
				readonly={readonly}
			/>
		</VStack>
	);
});
