import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';
import { HTMLAttributes, memo, ReactNode } from 'react';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type cardPadding = '0' | '8' | '16' | '24';
export type cardBorder = 'round' | 'normal' | 'partial';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
	variant?: CardVariant;
	max?: boolean;
	padding?: cardPadding;
	border?: cardBorder;
}

const mapPaddingToClass: Record<cardPadding, string> = {
	'0': 'gap_0',
	'8': 'gap_8',
	'16': 'gap_16',
	'24': 'gap_24',
};

export const Card = memo((props: CardProps) => {
	const {
		className,
		children,
		variant = 'normal',
		max,
		padding = '8',
		border = 'normal',
		...otherProps
	} = props;

	const paddingClass = mapPaddingToClass[padding];

	return (
		<div
			className={classNames(cls.Card, { [cls.max]: max }, [
				className,
				cls[variant],
				cls[paddingClass],
				cls[border],
			])}
			{...otherProps}
		>
			{children}
		</div>
	);
});
