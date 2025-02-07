import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { memo, useState } from 'react';
import { Icon as IconDeprecated } from '../Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../../redesigned/Icon';

interface StarRatingProps {
	className?: string;
	onSelect?: (starCount: number) => void;
	size?: number;
	selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * Устарел, новые компоненты в папке redesigned
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
	const { className, selectedStars = 0, size = 30, onSelect } = props;

	const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
	const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

	const onHover = (starsCount: number) => () => {
		if (!isSelected) {
			setCurrentStarsCount(starsCount);
		}
	};

	const onLeave = () => {
		if (!isSelected) {
			setCurrentStarsCount(0);
		}
	};

	const onClick = (starsCount: number) => () => {
		if (!isSelected) {
			onSelect?.(starsCount);
			setCurrentStarsCount(starsCount);
			setIsSelected(true);
		}
	};

	return (
		<div
			className={classNames(
				toggleFeatures({
					name: 'isAppRedesigned',
					on: () => cls.StarRatingRedesigned,
					off: () => cls.StarRating,
				}),
				{},
				[className],
			)}
		>
			{stars.map((starNumber) => {
				const commonProps = {
					className: classNames(cls.StarIcon, { [cls.selected]: isSelected }, [
						currentStarsCount >= starNumber ? cls.hovered : cls.normal,
					]),
					Svg: StarIcon,
					key: starNumber,
					height: size,
					width: size,
					onMouseLeave: onLeave,
					onMouseEnter: onHover(starNumber),
					onClick: onClick(starNumber),
					'data-testid': `StarRating.${starNumber}`,
					'data-selected': currentStarsCount >= starNumber,
				};

				return (
					<ToggleFeatures
						key={starNumber}
						feature={'isAppRedesigned'}
						on={<Icon clickable={!isSelected} {...commonProps} />}
						off={<IconDeprecated {...commonProps} />}
					/>
				);
			})}
		</div>
	);
});
