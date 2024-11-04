import { classNames } from "shared/lib/classNames/classNames";
import cls from './ArticlesPage.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { ArticleList } from "entities/Article";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articlesPageReducer, getArticles } from "../../model/slices/articlePageSlice";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useDispatch, useSelector } from "react-redux";
import {
	getArticlesPageError,
	getArticlesPageInited,
	getArticlesPageIsLoading,
	getArticlesPageView
} from "../../model/selectors/articlesPageSelectors";
import { Page } from "widgets/Page/Page";
import { fetchNextArticlePage } from "../../model/services/fetchNextArticlePage/fetchNextArticlePage";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlePage";
import { ArticlePageFilters } from "../ArticlePageFilters/ArticlePageFilters";
import { useSearchParams } from "react-router-dom";
import { ArticleInfiniteList } from "pages/ArticlesPage/ui/ArticleInfiniteList/ArticleInfiniteList";

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {

	const { t } = useTranslation('article');
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlePage());
	}, [dispatch]);

	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams));
	})

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<Page
				onScrollEnd={onLoadNextPart}
				className={classNames(cls.ArticlesPage, {}, [className])}
			>
				<ArticlePageFilters />
				<ArticleInfiniteList className={cls.list} />
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);