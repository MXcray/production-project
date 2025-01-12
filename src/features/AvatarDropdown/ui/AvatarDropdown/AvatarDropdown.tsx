import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUserAuthData,
	isUserAdmin,
	isUserManager,
	userActions,
} from '@/entities/User';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

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
	}, [dispatch]);

	const isAdminPanelAvailable = isAdmin || isManager;

	if (!authData) {
		return null;
	}

	const items = [
		...(isAdminPanelAvailable
			? [
					{
						content: t('Админка'),
						href: getRouteAdmin(),
					},
			  ]
			: []),
		{
			content: t('Профиль'),
			href: getRouteProfile(authData.id),
		},
		{
			content: t('Выйти'),
			onClick: onLogout,
		},
	];

	const RedesignedDropdown = () => {
		return (
			<Dropdown
				className={classNames('', {}, [className])}
				direction={'bottom left'}
				items={items}
				trigger={<Avatar size={40} src={authData.avatar} />}
			/>
		);
	};

	const DeprecatedDropdown = () => {
		return (
			<DropdownDeprecated
				className={classNames('', {}, [className])}
				direction={'bottom left'}
				items={items}
				trigger={
					<AvatarDeprecated fallbackInverted size={30} src={authData.avatar} />
				}
			/>
		);
	};

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={<RedesignedDropdown />}
			off={<DeprecatedDropdown />}
		/>
	);
});
