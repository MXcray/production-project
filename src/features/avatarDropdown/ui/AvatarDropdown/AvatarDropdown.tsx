import { classNames } from "shared/lib/classNames/classNames";
import cls from './AvatarDropdown.module.scss';
import { useTranslation } from "react-i18next";
import React, { memo, useCallback } from "react";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Dropdown } from "shared/ui/Popups";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "entities/User";

interface avatarDropdownProps {
	className?: string;
}

export const AvatarDropdown = memo(({ className }: avatarDropdownProps) => {

	const { t } = useTranslation();

	const dispatch = useDispatch();
	const authData = useSelector(getUserAuthData);
	const isAdmin = useSelector(isUserAdmin);
	const isManager = useSelector(isUserManager);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch])

	const isAdminPanelAvailable = isAdmin || isManager;

	if (!authData) {
		return null;
	}

	return (
		<Dropdown
			className={classNames(cls.avatarDropdown, {}, [className])}
			direction={'bottom left'}
			items={[
				...(isAdminPanelAvailable ? [{
					content: t('Админка'),
					href: RoutePath.admin_panel,
				}] : []),
				{
					content: t('Профиль'),
					href: RoutePath.profile + authData.id,
				},
				{
					content: t('Выйти'),
					onClick: onLogout,
				},
			]}
			trigger={<Avatar size={30} src={authData.avatar}/>}
		/>
	);
});