import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
	Button as ButtonDeprecated,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
	className?: string;
	short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
	const { t, i18n } = useTranslation();

	const toggle = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	const RedesignedLangSwitcher = () => {
		return (
			<Button variant="clear" onClick={toggle}>
				{t(short ? 'Коротий язык' : 'Язык')}
			</Button>
		);
	};

	const DeprecatedLangSwitcher = () => {
		return (
			<ButtonDeprecated
				theme={ButtonTheme.CLEAR}
				className={classNames('cls.LangSwitcher', {}, [className])}
				onClick={toggle}
			>
				{t(short ? 'Коротий язык' : 'Язык')}
			</ButtonDeprecated>
		);
	};

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={<RedesignedLangSwitcher />}
			off={<DeprecatedLangSwitcher />}
		/>
	);
});
