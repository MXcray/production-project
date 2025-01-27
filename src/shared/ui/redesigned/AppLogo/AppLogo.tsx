import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { memo } from 'react';
import { HStack } from '../stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';

interface AppLogoProps {
	className?: string;
	size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
	const { className, size } = props;

	return (
		<HStack
			max
			justify={'center'}
			className={classNames(cls.AppLogoWrapper, {}, [className])}
		>
			<div className={cls.gradientBig} />
			<div className={cls.gradientSmall} />
			<AppSvg
				width={size}
				height={size}
				color="black"
				className={cls.appLogo}
			/>
		</HStack>
	);
});
