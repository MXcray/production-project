import { classNames } from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { ArticleDetails } from "entities/Article";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsCommentReducer, getArticleComments } from "../../model/slice/articleDetailsCommentSlice";
import { useDispatch, useSelector } from "react-redux";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { AddNewComment } from "features/addNewCommnt";
import { addNewCommentForArticle } from "../../model/services/addNewCommentForArticle/addNewCommentForArticle";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Page } from "shared/ui/Page/Page";

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsComments: articleDetailsCommentReducer,
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {

	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	const navigate = useNavigate();

	const onBackToList = useCallback(() => {
		navigate(RoutePath.articles);
	}, [navigate])

	const onSendComment = useCallback((text: string) => {
		dispatch(addNewCommentForArticle(text));
	}, [dispatch])

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
	})

	if (!id) {
		return (
			<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				{t('Статья не найдена')}
			</Page>
		)
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
			<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				<Button
					theme={ButtonTheme.OUTLINE}
					onClick={onBackToList}
				>
					{t('Назад к списку')}
				</Button>
				<ArticleDetails id={id} />
				<Text className={cls.commentTitle} title={t('Комментарии')} />
				<AddNewComment onSendComment={onSendComment}/>
				<CommentList isLoading={commentsIsLoading} comments={comments} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);