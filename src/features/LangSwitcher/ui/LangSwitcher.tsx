import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { memo } from 'react';

interface LangSwitcherProps {
	className?: string;
	short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
	const { t, i18n } = useTranslation();

	const toggle = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<Button
			theme={ButtonTheme.CLEAR}
			className={classNames('cls.LangSwitcher', {}, [className])}
			onClick={toggle}
		>
			{t(short ? 'Коротий язык' : 'Язык')}
		</Button>
	);
});
