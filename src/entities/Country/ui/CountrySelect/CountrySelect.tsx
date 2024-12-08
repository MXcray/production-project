import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CountrySelect.module.scss';
import { useTranslation } from 'react-i18next';
import { Country } from '../../model/types/country';
import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';

interface CountrySelectProps {
	className?: string;
	value?: Country;
	onChange?: (value: Country) => void;
	readonly?: boolean;
}

const options = [
	{ value: Country.Russia, content: Country.Russia },
	{ value: Country.Belarus, content: Country.Belarus },
	{ value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo(
	({ className, value, onChange, readonly }: CountrySelectProps) => {
		const { t } = useTranslation();

		const onChangeHandler = useCallback(
			(value: string) => {
				onChange?.(value as Country);
			},
			[onChange],
		);

		return (
			<ListBox
				className={classNames('', { [cls.readonly]: readonly }, [className])}
				value={value}
				defaultValue={t('Укажите страну')}
				label={t('Укажите страну')}
				items={options}
				readonly={readonly}
				onChange={onChangeHandler}
				direction="top right"
			/>
		);
	},
);
