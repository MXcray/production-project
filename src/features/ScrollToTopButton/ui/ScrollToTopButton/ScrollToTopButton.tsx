import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToTopButton.module.scss';
import { memo } from 'react';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToTopButtonProps {
	className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
	const { className } = props;

	const onClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<Icon
			className={classNames(cls.ScrollToTopButton, {}, [className])}
			Svg={CircleIcon}
			width={32}
			height={32}
			clickable
			onClick={onClick}
		></Icon>
	);
});
