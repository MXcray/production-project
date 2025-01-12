import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import cls from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../../redesigned/stack';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

export interface ListBoxItem {
	value: string;
	content: ReactNode;
	disabled?: boolean;
}

interface ListBoxProps {
	items?: ListBoxItem[];
	className?: string;
	value?: string;
	defaultValue?: string;
	onChange: (value: string) => void;
	readonly?: boolean;
	direction?: DropdownDirection;
	label?: string;
}

export function ListBox(props: ListBoxProps) {
	const {
		className,
		items,
		value,
		defaultValue,
		onChange,
		readonly,
		direction = 'bottom right',
		label,
	} = props;

	const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

	return (
		<HStack gap={'4'}>
			{label && (
				<span className={classNames('', { [cls.readonly]: readonly }, [])}>
					{`${label}>`}
				</span>
			)}
			<HListBox
				disabled={readonly}
				as={'div'}
				className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
				value={value}
				onChange={onChange}
			>
				<HListBox.Button disabled={readonly} className={cls.trigger}>
					<Button disabled={readonly}>{value ?? defaultValue}</Button>
				</HListBox.Button>
				<HListBox.Options
					className={classNames(cls.options, {}, optionsClasses)}
				>
					{items?.map((item) => (
						<HListBox.Option
							key={item.value}
							value={item.value}
							disabled={item.disabled}
							as={Fragment}
						>
							{({ active, selected }) => (
								<li
									className={classNames(cls.item, {
										[popupCls.active]: active,
										[popupCls.disabled]: item.disabled,
									})}
								>
									{selected && '!!!'}
									{item.content}
								</li>
							)}
						</HListBox.Option>
					))}
				</HListBox.Options>
			</HListBox>
		</HStack>
	);
}
