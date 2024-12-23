import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';
import { ChangeEvent, useMemo } from 'react';

export interface SelectOption<T extends string> {
	value: T;
	content: string;
}

interface SelectProps<T extends string> {
	className?: string;
	label?: string;
	options?: SelectOption<T>[];
	value?: T;
	onChange?: (value: T) => void;
	readonly?: boolean;
}

/**
 * Устарел, новые компоненты в папке redesigned
 * @deprecated
 */
export const Select = <T extends string>(props: SelectProps<T>) => {
	const { className, label, options, value, onChange, readonly } = props;

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		if (onChange) {
			onChange(e.target.value as T);
		}
	};

	const optionList = useMemo(() => {
		return options?.map((opt) => {
			return (
				<option className={cls.option} value={opt.value} key={opt.value}>
					{opt.content}
				</option>
			);
		});
	}, [options]);

	const mods: Mods = {};

	return (
		<div className={classNames(cls.Wrapper, mods, [className])}>
			{label && <span className={cls.label}>{`${label}>`}</span>}
			<select
				disabled={readonly}
				className={cls.select}
				value={value}
				onChange={onChangeHandler}
			>
				{optionList}
			</select>
		</div>
	);
};
