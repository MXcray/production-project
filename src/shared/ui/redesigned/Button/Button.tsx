import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

export type ButtonVariant = 'clear' | 'outline';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?: ButtonVariant;
	/**
	 * Флаг, делающий кнопку квадратной
	 */
	square?: boolean;
	size?: ButtonSize;
	disabled?: boolean;
	children?: ReactNode;
	fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		children,
		variant = 'outline',
		square,
		size = 'm',
		disabled,
		fullWidth,
		...otherProps
	} = props;

	const mods: Mods = {
		[cls.square]: square,
		[cls.disabled]: disabled,
		[cls.fullWidth]: fullWidth,
	};

	return (
		<button
			type="button"
			className={classNames(cls.Button, mods, [
				className,
				cls[variant],
				cls[size],
			])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	);
});
