import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/deprecated/stack';
import { Text } from '@/shared/ui/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import { profileActions } from '../../model/slice/ProfileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

interface EditableProfileCardHeaderProps {
	className?: string;
}

export const EditableProfileCardHeader = memo(
	({ className }: EditableProfileCardHeaderProps) => {
		const { t } = useTranslation('profile');
		const authData = useSelector(getUserAuthData);
		const profileData = useSelector(getProfileData);
		const dispatch = useAppDispatch();
		const canEdit = authData?.id === profileData?.id;
		const readonly = useSelector(getProfileReadOnly);

		const onEdit = useCallback(() => {
			dispatch(profileActions.setReadonly(false));
		}, [dispatch]);

		const onCancelEdit = useCallback(() => {
			dispatch(profileActions.cancelEdit());
		}, [dispatch]);

		const onSave = useCallback(() => {
			dispatch(updateProfileData());
		}, [dispatch]);

		return (
			<HStack
				justify={'between'}
				max
				className={classNames('', {}, [className])}
			>
				<Text title={t('Профиль')} />
				{canEdit && (
					<>
						{readonly ? (
							<Button
								theme={ButtonTheme.OUTLINE}
								onClick={onEdit}
								data-testid={'EditableProfileCardHeader.EditButton'}
							>
								{t('Редактировать')}
							</Button>
						) : (
							<HStack gap={'8'}>
								<Button
									theme={ButtonTheme.OUTLINE_RED}
									onClick={onCancelEdit}
									data-testid={'EditableProfileCardHeader.CancelButton'}
								>
									{t('Отменить')}
								</Button>
								<Button
									theme={ButtonTheme.OUTLINE}
									onClick={onSave}
									data-testid={'EditableProfileCardHeader.SaveButton'}
								>
									{t('Сохранить')}
								</Button>
							</HStack>
						)}
					</>
				)}
			</HStack>
		);
	},
);
