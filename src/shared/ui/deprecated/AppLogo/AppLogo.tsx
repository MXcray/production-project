import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { memo } from 'react';
import { HStack } from '../../redesigned/stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';

interface AppLogoProps {
	className?: string;
}

/**
 * Устарел, новые компоненты в папке redesigned
 * @deprecated
 */
export const AppLogo = memo((props: AppLogoProps) => {
	const { className } = props;

	return (
		<HStack
			max
			justify={'center'}
			className={classNames(cls.AppLogoWrapper, {}, [className])}
		>
			<AppSvg className={cls.appLogo} />
			<div className={cls.gradientBig} />
			<div className={cls.gradientSmall} />
		</HStack>
	);
});
