import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { memo } from 'react';
import { Comment } from '../../model/types/comments';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/stack';
import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
	className?: string;
	comment?: Comment;
	isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
	const { className, isLoading, comment } = props;

	const Skeleton = toggleFeatures({
		name: 'isAppRedesigned',
		on: () => SkeletonRedesigned,
		off: () => SkeletonDeprecated,
	});

	if (isLoading) {
		return (
			<VStack
				gap={'8'}
				max
				className={classNames(cls.CommentCard, {}, [className, cls.loading])}
				data-testid={'CommendCard.Loading'}
			>
				<div className={cls.header}>
					<Skeleton width={30} height={30} borderRad={'50%'} />
					<Skeleton className={cls.username} width={100} height={30} />
				</div>
				<Skeleton className={cls.text} width={'100%'} height={30} />
			</VStack>
		);
	}

	if (!comment) {
		return null;
	}

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<Card padding={'24'} border={'round'} max>
					<VStack
						gap={'8'}
						max
						className={classNames(cls.CommentCardRedesigned, {}, [className])}
						data-testid={'CommendCard.Content'}
					>
						<AppLink to={getRouteProfile(comment.user.id)}>
							<HStack gap={'8'}>
								{comment.user.avatar ? (
									<Avatar size={30} src={comment.user.avatar} />
								) : null}
								<Text text={comment.user.username} bold />
							</HStack>
						</AppLink>
						<Text text={comment.text} />
					</VStack>
				</Card>
			}
			off={
				<VStack
					gap={'8'}
					max
					className={classNames(cls.CommentCard, {}, [className])}
					data-testid={'CommendCard.Content'}
				>
					<AppLinkDeprecated
						className={cls.header}
						to={getRouteProfile(comment.user.id)}
					>
						{comment.user.avatar ? (
							<AvatarDeprecated size={30} src={comment.user.avatar} />
						) : null}
						<TextDeprecated
							className={cls.username}
							title={comment.user.username}
						/>
					</AppLinkDeprecated>
					<TextDeprecated className={cls.text} text={comment.text} />
				</VStack>
			}
		/>
	);
});
