import { Profile } from '../../model/types/profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { ToggleFeatures } from '@/shared/lib/features';
import {
	ProfileCardDeprecated,
	ProfileCardDeprecatedError,
	ProfileCardDeprecatedSkeleton,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
	ProfileCardRedesigned,
	ProfileCardRedesignedError,
	ProfileCardRedesignedSkeleton,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

export interface ProfileCardProps {
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
	const { isLoading, error } = props;

	if (isLoading) {
		return (
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={<ProfileCardRedesignedSkeleton />}
				off={<ProfileCardDeprecatedSkeleton />}
			/>
		);
	}

	if (error) {
		return (
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={<ProfileCardRedesignedError />}
				off={<ProfileCardDeprecatedError />}
			/>
		);
	}

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={<ProfileCardRedesigned {...props} />}
			off={<ProfileCardDeprecated {...props} />}
		/>
	);
};
