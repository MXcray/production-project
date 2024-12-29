import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import { useTranslation } from 'react-i18next';
import {
	AppLink as AppLinkDeprecated,
	AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

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

	const RedesignedSidebarItem = () => {
		return (
			<AppLink
				to={item.path}
				className={classNames(cls.itemRedesigned, {
					[cls.collapsedRedesigned]: collapsed,
				})}
				activeClassName={cls.active}
			>
				<Icon Svg={item.Icon} />
				<span className={cls.link}>{t(item.text)}</span>
			</AppLink>
		);
	};

	const DeprecatedSidebarItem = () => {
		return (
			<AppLinkDeprecated
				to={item.path}
				className={classNames(cls.item, { [cls.collapsed]: collapsed })}
				theme={AppLinkTheme.SECONDARY}
			>
				<item.Icon className={cls.icon} />
				<span className={cls.link}>{t(item.text)}</span>
			</AppLinkDeprecated>
		);
	};

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={<RedesignedSidebarItem />}
			off={<DeprecatedSidebarItem />}
		/>
	);
});
