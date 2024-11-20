import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import React, { memo, useMemo, useState } from "react";
import { ThemeSwitcher } from "@/widgets/ThemeSwither";
import { LangSwitcher } from "@/widgets/LangSwitcher";
import { useTranslation } from "react-i18next";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { useSelector } from "react-redux";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
import { VStack } from "@/shared/ui/stack/VStack/VStack";

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {

	const { t } = useTranslation();

	const [collapsed, setCollapsed] = useState(false);
	const sidebarItemsList = useSelector(getSidebarItems);
	const onCollapsed = () => {
	  setCollapsed(prev => !prev);
	}

	const itemsList = useMemo(() => sidebarItemsList.map((item) => (
		<SidebarItem
			item={item}
			collapsed={collapsed}
			key={item.path}
		/>
	)), [collapsed, sidebarItemsList]);

	return (
		<aside
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

			<VStack
				role={'navigation'}
				gap={'8'}
				className={cls.items}
			>
				{itemsList}
			</VStack>

			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher short={collapsed} className={cls.lang}/>
			</div>
		</aside>
	);
});