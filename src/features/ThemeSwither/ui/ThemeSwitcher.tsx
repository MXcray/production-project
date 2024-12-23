import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { memo, useCallback } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import ThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';

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

	return (
		<Button
			theme={ButtonTheme.CLEAR}
			className={classNames('', {}, [className])}
			onClick={onToggleHandler}
		>
			<Icon Svg={ThemeIcon} width={40} height={40} inverted />
		</Button>
	);
});
