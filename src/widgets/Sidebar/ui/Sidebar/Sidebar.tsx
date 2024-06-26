import { classNames } from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import React, { useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwither";
import { LangSwitcher } from "widgets/LangSwitcher";
import { useTranslation } from "react-i18next";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';

interface SidebarProps {
	className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {

	const { t } = useTranslation();

	const [collapsed, setCollapsed] = useState(false);

	const onCollapsed = () => {
		setCollapsed(prev => !prev);
	}

	return (
		<div
			data-testid="sidebar"
			className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			<Button
				data-testid="sidebar-toggle"
				onClick={onCollapsed}
				className={cls.collapseBtn}
				theme={ButtonTheme.BACKGROUND_INVERTED}
				size={ButtonSize.L}
				square
			>
				{collapsed ? '>' : '<'}
			</Button>

			<div className={cls.items}>

				<AppLink
					to={RoutePath.main}
					className={cls.item}
					theme={AppLinkTheme.SECONDARY}
				>
					<MainIcon className={cls.icon} />
					<span className={cls.link}>
						{t('Главная')}
					</span>
				</AppLink>

				<AppLink
					to={RoutePath.about}
					className={cls.item}
					theme={AppLinkTheme.SECONDARY}
				>
					<AboutIcon className={cls.icon} />
					<span className={cls.link}>
						{t('О сайте')}
					</span>
				</AppLink>

			</div>

			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher short={collapsed} className={cls.lang}/>
			</div>
		</div>
	);
};