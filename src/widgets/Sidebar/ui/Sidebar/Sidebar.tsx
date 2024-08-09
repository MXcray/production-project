import { classNames } from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import React, { memo, useMemo, useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwither";
import { LangSwitcher } from "widgets/LangSwitcher";
import { useTranslation } from "react-i18next";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { SidebarItemsList } from "../../model/items";
import { SidebarItem } from "../SidebarItem/SidebarItem";

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {

	const { t } = useTranslation();

	const [collapsed, setCollapsed] = useState(false);

	const onCollapsed = () => {
		setCollapsed(prev => !prev);
	}

	const itemsList = useMemo(() => SidebarItemsList.map((item) => (
		<SidebarItem
			item={item}
			collapsed={collapsed}
			key={item.path}
		/>
	)), [collapsed]);

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
				{itemsList}
			</div>

			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher short={collapsed} className={cls.lang}/>
			</div>
		</div>
	);
});