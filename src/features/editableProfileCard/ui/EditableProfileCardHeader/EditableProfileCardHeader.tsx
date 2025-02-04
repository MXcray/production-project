import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import {
	Button as ButtonDeprecated,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import { profileActions } from '../../model/slice/ProfileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';

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
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<Card border={'partial'} padding={'24'} max>
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
											onClick={onEdit}
											data-testid={'EditableProfileCardHeader.EditButton'}
										>
											{t('Редактировать')}
										</Button>
									) : (
										<HStack gap={'8'}>
											<Button
												onClick={onCancelEdit}
												color={'error'}
												data-testid={'EditableProfileCardHeader.CancelButton'}
											>
												{t('Отменить')}
											</Button>
											<Button
												onClick={onSave}
												color={'success'}
												data-testid={'EditableProfileCardHeader.SaveButton'}
											>
												{t('Сохранить')}
											</Button>
										</HStack>
									)}
								</>
							)}
						</HStack>
					</Card>
				}
				off={
					<HStack
						justify={'between'}
						max
						className={classNames('', {}, [className])}
					>
						<TextDeprecated title={t('Профиль')} />
						{canEdit && (
							<>
								{readonly ? (
									<ButtonDeprecated
										theme={ButtonTheme.OUTLINE}
										onClick={onEdit}
										data-testid={'EditableProfileCardHeader.EditButton'}
									>
										{t('Редактировать')}
									</ButtonDeprecated>
								) : (
									<HStack gap={'8'}>
										<ButtonDeprecated
											theme={ButtonTheme.OUTLINE_RED}
											onClick={onCancelEdit}
											data-testid={'EditableProfileCardHeader.CancelButton'}
										>
											{t('Отменить')}
										</ButtonDeprecated>
										<ButtonDeprecated
											theme={ButtonTheme.OUTLINE}
											onClick={onSave}
											data-testid={'EditableProfileCardHeader.SaveButton'}
										>
											{t('Сохранить')}
										</ButtonDeprecated>
									</HStack>
								)}
							</>
						)}
					</HStack>
				}
			/>
		);
	},
);
