import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { memo } from 'react';
import { Notification } from '../../model/types/notification';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationItemProps {
	className?: string;
	item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
	const { className, item } = props;

	const NotificationItemRedesigned = () => {
		return (
			<Card className={classNames(cls.NotificationItem, {}, [className])}>
				<Text title={item.title} text={item.description} />
			</Card>
		);
	};

	const NotificationItemDeprecated = () => {
		return (
			<CardDeprecated
				theme={CardTheme.OUTLINED}
				className={classNames(cls.NotificationItem, {}, [className])}
			>
				<TextDeprecated title={item.title} text={item.description} />
			</CardDeprecated>
		);
	};

	const content = (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={<NotificationItemRedesigned />}
			off={<NotificationItemDeprecated />}
		/>
	);

	if (item.href) {
		return (
			<a
				className={cls.link}
				href={item.href}
				target={'_blank'}
				rel={'noreferrer'}
			>
				{content}
			</a>
		);
	}

	return content;
});
