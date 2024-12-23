import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';

interface SidebarItemProps {
	item: SidebarItemType;
	collapsed: boolean;
	// Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const { item, collapsed } = props;

	const { t } = useTranslation();
	const isAuth = useSelector(getUserAuthData);

	if (item.authOnly && !isAuth) {
		return null;
	}

	return (
		<AppLink
			to={item.path}
			className={classNames(cls.item, { [cls.collapsed]: collapsed })}
			theme={AppLinkTheme.SECONDARY}
		>
			<item.Icon className={cls.icon} />
			<span className={cls.link}>{t(item.text)}</span>
		</AppLink>
	);
});
