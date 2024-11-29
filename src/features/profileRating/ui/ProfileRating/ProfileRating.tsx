import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { RatingCard } from "@/entities/Rating";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { Skeleton } from "@/shared/ui/Skeleton";
import { useGetProfileRating, useRateProfile } from "../../api/profileRating";

export interface ProfileRatingProps {
	className?: string;
	profileId: string;
}

const ProfileRating = memo((props: ProfileRatingProps) => {

	const {
		className,
		profileId,
	} = props;
	const { t } = useTranslation();

	const userData = useSelector(getUserAuthData);

	const { data, isLoading } = useGetProfileRating({
		profileId,
		userId: userData?.id ?? '',
	})

	const [rateProfileMutation] = useRateProfile();

	const handleRateProfile = useCallback((starsCount: number, feedback?: string) => {
		try {
			rateProfileMutation({
				profileId,
				userId: userData?.id ?? '',
				feedback,
				rate: starsCount,
			})
		} catch (e) {
			console.log(e)
		}

	}, [profileId, rateProfileMutation, userData?.id])

	const onAccept = useCallback((starsCount: number, feedback?: string) => {
		handleRateProfile(starsCount, feedback)
	}, [handleRateProfile]);

	const onCancel = useCallback((starsCount: number) => {
		handleRateProfile(starsCount)
	}, [handleRateProfile]);

	if (isLoading) {
		return <Skeleton width={'100%'} height={120}/>
	}

	const rating = data?.[0];

	return (
		<RatingCard
			onAccept={onAccept}
			onCancel={onCancel}
			rate={rating?.rate}
			className={className}
			title={t('Оцените профиль')}
			feedbackTitle={t('Оставьте свой отзыв о пользователе, это поможет улучшить качество')}
			hasFeedback
		/>
	);
});

export default ProfileRating;