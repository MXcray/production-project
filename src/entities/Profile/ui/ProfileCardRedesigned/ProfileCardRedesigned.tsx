import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/redesigned/stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Card } from '@/shared/ui/redesigned/Card';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedError = () => {
	const { t } = useTranslation('profile');

	return (
		<HStack justify={'center'} max>
			<Text
				variant={'error'}
				title={t('Произошла ошибка при загрузке профиля')}
				text={t('Попробуйте перезагрузить страницу')}
				align={'center'}
			/>
		</HStack>
	);
};

export const ProfileCardRedesignedSkeleton = () => {
	return (
		<Card max padding={'24'}>
			<VStack gap={'32'}>
				<HStack max justify={'center'}>
					<Skeleton borderRad={'100%'} width={128} height={128} />
				</HStack>
				<HStack gap={'32'} max>
					<VStack gap={'16'} max>
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
					</VStack>
					<VStack gap={'16'} max>
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
					</VStack>
				</HStack>
			</VStack>
		</Card>
	);
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
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

	return (
		<Card padding={'24'} border={'partial'} max className={className}>
			<VStack gap={'32'}>
				{data?.avatar && (
					<HStack justify={'center'} max>
						<Avatar src={data?.avatar} size={128} alt="avatar" />
					</HStack>
				)}
				<HStack gap={'24'} max>
					<VStack gap={'16'} max>
						<Input
							value={data?.first}
							label={t('Имя')}
							readonly={readonly}
							onChange={onChangeFirstname}
							data-testid={'ProfileCard.firstname'}
						/>
						<Input
							value={data?.lastname}
							label={t('Фамилия')}
							readonly={readonly}
							onChange={onChangeLastname}
							data-testid={'ProfileCard.lastname'}
						/>
						<Input
							value={data?.age}
							label={t('Возраст')}
							readonly={readonly}
							onChange={onChangeAge}
						/>
						<Input
							value={data?.city}
							label={t('Город')}
							readonly={readonly}
							onChange={onChangeCity}
						/>
					</VStack>
					<VStack gap={'16'} max>
						<Input
							value={data?.username}
							label={t('Имя пользователя')}
							readonly={readonly}
							onChange={onChangeUsername}
						/>
						<Input
							value={data?.avatar}
							label={t('Ссылка на аватар')}
							readonly={readonly}
							onChange={onChangeAvatar}
						/>
						<CurrencySelect
							value={data?.currency}
							onChange={onChangeCurrency}
							readonly={readonly}
						/>
						<CountrySelect
							value={data?.country}
							onChange={onChangeCountry}
							readonly={readonly}
						/>
					</VStack>
				</HStack>
			</VStack>
		</Card>
	);
});
