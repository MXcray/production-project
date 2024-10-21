import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from './ProfileCard.module.scss';
import { useTranslation } from "react-i18next";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { Input } from "shared/ui/Input/Input";
import { Profile } from "../../model/types/profile";
import { Loader } from "shared/ui/Loader/Loader";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Currency } from "entities/Currency/model/types/currency"
import { Country } from "entities/Country/model/types/country"
import { CurrencySelect } from "entities/Currency";
import { CountrySelect } from "entities/Country";
import { HStack, VStack } from "shared/ui/stack";

interface ProfileCardProps {
	className?: string;
	data?: Profile;
	error?: string;
	isLoading?: boolean;
	readonly?: boolean;
	onChangeFirstname?: (value?: string) => void;
	onChangeLastname?: (value?: string) => void;
	onChangeAge?: (value?: string) => void;
	onChangeCity?: (value?: string) => void;
	onChangeUsername?: (value?: string) => void;
	onChangeAvatar?: (value: string) => void;
	onChangeCurrency?: (currency?: Currency) => void;
	onChangeCountry?: (country?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {

	const {
		className,
		data ,
		isLoading,
		error,
		readonly,
		onChangeFirstname,
		onChangeLastname,
		onChangeAge,
		onChangeCity,
		onChangeUsername,
		onChangeAvatar,
		onChangeCurrency,
		onChangeCountry,
	} = props

	const { t } = useTranslation('profile');

	if (isLoading) {
		return (
			<HStack justify={'center'} max className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
				<Loader />
			</HStack>
		)
	}

	if (error) {
		return (
			<HStack justify={'center'} max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
				<Text
					theme={TextTheme.ERROR}
					title={t('Произошла ошибка при загрузке профиля')}
					text={t('Попробуйте перезагрузить страницу')}
					align={TextAlign.CENTER}
				/>
			</HStack>
		)
	}

	const mods: Mods = {
		[cls.editing]: !readonly,
	};

	return (
		<VStack gap={'8'} max className={classNames(cls.ProfileCard, mods, [className])}>
			{data?.avatar &&
				<HStack justify={'center'} max className={cls.avatarWrapper}>
					<Avatar src={data?.avatar} size={150} alt='avatar' />
				</HStack>
			}
			<Input
				value={data?.first}
				placeholder={t('Ваше имя')}
				className={cls.input}
				readonly={readonly}
				onChange={onChangeFirstname}
			/>
			<Input
				value={data?.lastname}
				placeholder={t('Ваша фамилия')}
				className={cls.input}
				readonly={readonly}
				onChange={onChangeLastname}
			/>
			<Input
				value={data?.age}
				placeholder={t('Ваш возраст')}
				className={cls.input}
				readonly={readonly}
				onChange={onChangeAge}
			/>
			<Input
				value={data?.city}
				placeholder={t('Город')}
				className={cls.input}
				readonly={readonly}
				onChange={onChangeCity}
			/>
			<Input
				value={data?.username}
				placeholder={t('Введите имя пользователя')}
				className={cls.input}
				readonly={readonly}
				onChange={onChangeUsername}
			/>
			<Input
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
};