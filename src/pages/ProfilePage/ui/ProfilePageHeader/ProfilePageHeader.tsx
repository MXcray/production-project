import { classNames } from "shared/lib/classNames/classNames";
import cls from './ProfilePageHeader.module.scss';
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getProfileReadOnly, profileActions, updateProfileData } from "entities/Profile";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ProfilePageHeaderProps {
	className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {

	const { t } = useTranslation('profile');
	const dispatch = useAppDispatch();

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
		<div className={classNames(cls.ProfilePageHeader, {}, [className])}>
			<Text title={t('Профиль')}/>

			{readonly
				? (
					<Button
						theme={ButtonTheme.OUTLINE}
						className={cls.editBtn}
						onClick={onEdit}
					>
						{t('Редактировать')}
					</Button>
				)
				: (
					<>
						<Button
							theme={ButtonTheme.OUTLINE_RED}
							className={cls.cancelBtn}
							onClick={onCancelEdit}
						>
							{t('Отменить')}
						</Button>
						<Button
							theme={ButtonTheme.OUTLINE}
							className={cls.saveBtn}
							onClick={onSave}
						>
							{t('Сохранить')}
						</Button>
					</>
				)

			}
		</div>
	);
};