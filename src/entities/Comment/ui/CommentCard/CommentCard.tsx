import { classNames } from "shared/lib/classNames/classNames";
import cls from './CommentCard.module.scss';
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Comment } from '../../model/types/comments';
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Text } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { VStack } from "shared/ui/stack";

interface CommentCardProps {
	className?: string;
	comment?: Comment;
	isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {

	const {
		className,
		isLoading ,
		comment,
	} = props;

	const { t } = useTranslation();

	if (isLoading) {
		return (
			<div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
				<div className={cls.header}>
					<Skeleton width={30} height={30} borderRad={'50%'} />
					<Skeleton className={cls.username} width={100} height={30} />
				</div>
				<Skeleton className={cls.text} width={'100%'} height={30} />
			</div>
		);
	}

	if (!comment) {
		return null;
	}

	return (
		<VStack gap={'8'} max className={classNames(cls.CommentCard, {}, [className])}>
			<AppLink className={cls.header} to={`${RoutePath.profile}${comment.user.id}`}>
				{comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
				<Text className={cls.username} title={comment.user.username} />
			</AppLink>
			<Text className={cls.text} text={comment.text} />
		</VStack>
	);
});