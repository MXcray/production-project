import { Menu } from '@headlessui/react';
import cls from './Dropdown.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

export interface DropdownItem {
	disabled?: boolean;
	content?: ReactNode;
	onClick?: () => void;
	href?: string;
}

interface DropdownProps {
	className?: string;
	items: DropdownItem[];
	trigger?: ReactNode;
	direction?: DropdownDirection;
}

export function Dropdown(props: DropdownProps) {
	const { className, items, trigger, direction = 'bottom right' } = props;

	const menuClasses = [mapDirectionClass[direction], popupCls.menu];

	return (
		<Menu
			as="div"
			className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
		>
			<Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
			<Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
				{items.map((item, index) => {
					const content = ({ active }: { active: boolean }) => (
						<button
							type="button"
							disabled={item.disabled}
							className={classNames(cls.item, { [popupCls.active]: active })}
							onClick={item.onClick}
						>
							{item.content}
						</button>
					);

					if (item.href) {
						return (
							// eslint-disable-next-line react/jsx-key
							<Menu.Item
								as={AppLink}
								to={item.href}
								disabled={item.disabled}
								key={`dropdown-key-${index}`}
							>
								{content}
							</Menu.Item>
						);
					}

					return (
						// eslint-disable-next-line react/jsx-key
						<Menu.Item
							as={Fragment}
							disabled={item.disabled}
							key={`dropdown-key-${index}`}
						>
							{content}
						</Menu.Item>
					);
				})}
			</Menu.Items>
		</Menu>
	);
}
