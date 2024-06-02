import { classNames } from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import React, { useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwither";
import { LangSwitcher } from "widgets/LangSwitcher";

interface SidebarProps {
	className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {

	const [collapsed, setCollapsed] = useState(false);

	const onCollapsed = () => {
		setCollapsed(prev => !prev);
	}

	return (
		<div
			data-testid="sidebar"
			className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			<button
				data-testid="sidebar-toggle"
				onClick={onCollapsed}
				style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
			>
				toggle
			</button>
			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher className={cls.lang}/>
			</div>
		</div>
	);
};