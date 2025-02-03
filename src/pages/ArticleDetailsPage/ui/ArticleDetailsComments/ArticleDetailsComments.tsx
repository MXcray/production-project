import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, Suspense, useCallback } from 'react';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { AddNewComment } from '@/features/addNewCommnt';
import { CommentList } from '@/entities/Comment';
import { useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addNewCommentForArticle } from '../../model/services/addNewCommentForArticle/addNewCommentForArticle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getArticleComments } from '../../model/slice/articleDetailsCommentSlice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { VStack } from '@/shared/ui/redesigned/stack';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleDetailsCommentsProps {
	className?: string;
	id?: string;
}

export const ArticleDetailsComments = memo(
	({ className, id }: ArticleDetailsCommentsProps) => {
		const { t } = useTranslation();
		const comments = useSelector(getArticleComments.selectAll);
		const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
		const dispatch = useAppDispatch();

		const onSendComment = useCallback(
			(text: string) => {
				dispatch(addNewCommentForArticle(text));
			},
			[dispatch],
		);

		useInitialEffect(() => {
			dispatch(fetchCommentsByArticleId(id));
		});

		return (
			<VStack gap={'16'} max className={classNames('', {}, [className])}>
				<ToggleFeatures
					feature={'isAppRedesigned'}
					on={<Text size={'l'} title={t('Комментарии')} />}
					off={<TextDeprecated size={TextSize.L} title={t('Комментарии')} />}
				/>
				<Suspense fallback={<Loader />}>
					<AddNewComment onSendComment={onSendComment} />
				</Suspense>
				<CommentList isLoading={commentsIsLoading} comments={comments} />
			</VStack>
		);
	},
);
