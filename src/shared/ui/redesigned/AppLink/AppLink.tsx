import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { LinkProps, NavLink } from 'react-router-dom';
import { memo, ReactNode } from 'react';

export type AppLinkTheme = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
	className?: string;
	variant?: AppLinkTheme;
	children?: ReactNode;
	activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
	const {
		to,
		className,
		children,
		variant = 'primary',
		activeClassName = '',
		...otherProps
	} = props;

	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				classNames(cls.AppLink, { [activeClassName]: isActive }, [
					className,
					cls[variant],
				])
			}
			{...otherProps}
		>
			{children}
		</NavLink>
	);
});
