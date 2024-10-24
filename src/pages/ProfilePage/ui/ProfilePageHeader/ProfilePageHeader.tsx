import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getProfileData, getProfileReadOnly, profileActions, updateProfileData } from "entities/Profile";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "entities/User";
import { HStack } from "shared/ui/stack/HStack/HStack";

interface ProfilePageHeaderProps {
	className?: string;
}
export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {

	const { t } = useTranslation('profile');
	const authData = useSelector(getUserAuthData);
	const profileData = useSelector(getProfileData);
	const dispatch = useAppDispatch();
	const canEdit = authData?.id === profileData?.id;
	const readonly = useSelector(getProfileReadOnly);

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadonly(false))
	}, [dispatch])

	const onCancelEdit = useCallback(() => {
		dispatch(profileActions.cancelEdit())
	}, [dispatch])

	const onSave = useCallback(() => {
		dispatch(updateProfileData());
	}, [dispatch])

	return (
		<HStack justify={'between'} max className={classNames('', {}, [className])}>
			<Text title={t('Профиль')}/>
			{canEdit && (
				<>
					{readonly
						? (
							<Button
								theme={ButtonTheme.OUTLINE}
								onClick={onEdit}
							>
								{t('Редактировать')}
							</Button>
						)
						: (
							<HStack gap={'8'}>
								<Button
									theme={ButtonTheme.OUTLINE_RED}
									onClick={onCancelEdit}
								>
									{t('Отменить')}
								</Button>
								<Button
									theme={ButtonTheme.OUTLINE}
									onClick={onSave}
								>
									{t('Сохранить')}
								</Button>
							</HStack>
						)
					}
				</>
			)}

		</HStack>
	);
};