import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { memo, useCallback } from 'react';
import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme();
	const dispatch = useAppDispatch();

	const onToggleHandler = useCallback(() => {
		toggleTheme((newTheme) => {
			dispatch(saveJsonSettings({ theme: newTheme }));
		});
	}, [dispatch, toggleTheme]);

	const RedesignedThemeSwitcher = () => {
		return (
			<Icon
				Svg={ThemeIcon}
				clickable
				onClick={onToggleHandler}
				className={cls.themeSwitcherRedesigned}
			/>
		);
	};

	const DeprecatedThemeSwitcher = () => {
		return (
			<Button
				theme={ButtonTheme.CLEAR}
				className={classNames('', {}, [className])}
				onClick={onToggleHandler}
			>
				<IconDeprecated
					Svg={ThemeIconDeprecated}
					width={40}
					height={40}
					inverted
				/>
			</Button>
		);
	};

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={<RedesignedThemeSwitcher />}
			off={<DeprecatedThemeSwitcher />}
		/>
	);
});
