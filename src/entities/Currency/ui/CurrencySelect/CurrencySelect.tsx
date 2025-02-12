import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CurrencySelect.module.scss';
import { useTranslation } from 'react-i18next';
import { Currency } from '../../model/types/currency';
import { memo, useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CurrencySelectProps {
	className?: string;
	value?: Currency;
	onChange?: (value: Currency) => void;
	readonly?: boolean;
}

const options = [
	{ value: Currency.RUB, content: Currency.RUB },
	{ value: Currency.USD, content: Currency.USD },
	{ value: Currency.EUR, content: Currency.EUR },
];

export const CurrencySelect = memo(
	({ className, value, onChange, readonly }: CurrencySelectProps) => {
		const { t } = useTranslation();

		const onChangeHandler = useCallback(
			(value: string) => {
				onChange?.(value as Currency);
			},
			[onChange],
		);

		const props = {
			className: classNames('', { [cls.readonly]: readonly }, [className]),
			value: value,
			defaultValue: t('Укажите валюту'),
			label: t('Укажите валюту'),
			items: options,
			onChange: onChangeHandler,
			readonly: readonly,
			direction: 'top right' as const,
		};

		return (
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={<ListBox {...props} />}
				off={<ListBoxDeprecated {...props} />}
			/>
		);
	},
);
