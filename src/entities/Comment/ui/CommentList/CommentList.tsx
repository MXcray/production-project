import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comments';
import { VStack } from '@/shared/ui/redesigned/stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface CommentListProps {
	className?: string;
	comments?: Comment[];
	isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
	const { className, isLoading, comments } = props;

	const { t } = useTranslation();

	if (isLoading) {
		return (
			<VStack gap={'16'} max className={classNames('', {}, [className])}>
				<CommentCard isLoading />
				<CommentCard isLoading />
				<CommentCard isLoading />
			</VStack>
		);
	}

	return (
		<VStack gap={'16'} max className={classNames('', {}, [className])}>
			{comments?.length ? (
				comments.map((comment) => (
					<CommentCard
						key={comment.id}
						comment={comment}
						isLoading={isLoading}
					/>
				))
			) : (
				<ToggleFeatures
					feature={'isAppRedesigned'}
					on={<Text text={t('Коментарии отсутсвуют')} />}
					off={<TextDeprecated text={t('Коментарии отсутсвуют')} />}
				/>
			)}
		</VStack>
	);
});
