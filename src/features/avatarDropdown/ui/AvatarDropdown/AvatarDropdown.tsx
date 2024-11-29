import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import React, { memo, useCallback } from "react";
import { Avatar } from "@/shared/ui/Avatar";
import { Dropdown } from "@/shared/ui/Popups";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "@/entities/User";
import { getRouteAdmin, getRouteProfile } from "@/shared/const/router";

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
			className={classNames('', {}, [className])}
			direction={'bottom left'}
			items={[
				...(isAdminPanelAvailable ? [{
					content: t('Админка'),
					href: getRouteAdmin(),
				}] : []),
				{
					content: t('Профиль'),
					href: getRouteProfile(authData.id),
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