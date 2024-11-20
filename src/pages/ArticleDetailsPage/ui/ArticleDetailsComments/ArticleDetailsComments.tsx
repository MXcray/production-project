import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, Suspense, useCallback } from "react";
import { Text, TextSize } from "@/shared/ui/Text/Text";
import { AddNewComment } from "@/features/addNewCommnt";
import { CommentList } from "@/entities/Comment";
import { useSelector } from "react-redux";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import {
	addNewCommentForArticle
} from "../../model/services/addNewCommentForArticle/addNewCommentForArticle";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getArticleComments } from "../../model/slice/articleDetailsCommentSlice";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import {
	fetchCommentsByArticleId
} from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { VStack } from "@/shared/ui/stack";
import { Loader } from "@/shared/ui/Loader/Loader";

interface ArticleDetailsCommentsProps {
	className?: string;
	id?: string;
}

export const ArticleDetailsComments = memo(({ className, id }: ArticleDetailsCommentsProps) => {

	const { t } = useTranslation();
	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	const dispatch = useAppDispatch();

	const onSendComment = useCallback((text: string) => {
		dispatch(addNewCommentForArticle(text));
	}, [dispatch])

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
	})

	return (
		<VStack gap={'16'} max className={classNames('', {}, [className])}>
			<Text
				size={TextSize.L}
				title={t('Комментарии')}
			/>
			<Suspense fallback={<Loader />}>
				<AddNewComment onSendComment={onSendComment}/>
			</Suspense>
			<CommentList
				isLoading={commentsIsLoading}
				comments={comments}
			/>
		</VStack>
	);
});