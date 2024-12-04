import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from './Avatar.module.scss';
import { CSSProperties, useMemo } from "react";
import { AppImage } from "../AppImage";
import UserIcon from '../../assets/icons/user-filled.svg';
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";

interface AvatarProps {
	className?: string;
	src?: string;
	size?: number;
	alt?: string;
	fallbackInverted?: boolean;
}

export const Avatar = (props: AvatarProps) => {

	const {
		className,
		src,
		size,
		alt,
		fallbackInverted,
	} = props

	const mods: Mods = {}

	const styles = useMemo<CSSProperties>(() => {
		return {
			width: size,
			height: size,
		}
	}, [size])

	const fallback = <Skeleton width={size} height={size} borderRad={'50%'} />;
	const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon} />;

	return (
		<AppImage
			fallback={fallback}
			errorFallback={errorFallback}
			src={src}
			style={styles}
			className={classNames(cls.Avatar, mods, [className])}
			alt={alt}
		/>
	);
};