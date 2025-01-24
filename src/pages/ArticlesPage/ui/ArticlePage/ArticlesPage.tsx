import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';
import { memo, useCallback } from 'react';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../model/slices/articlePageSlice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlePage';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';
import { useSearchParams } from 'react-router-dom';
import { ArticleInfiniteList } from '../../ui/ArticleInfiniteList/ArticleInfiniteList';
import { useTranslation } from 'react-i18next';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const { t } = useTranslation('article');
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlePage());
	}, [dispatch]);

	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams));
	});

	const content = (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<StickyContentLayout
					left={<ViewSelectorContainer />}
					right={<FiltersContainer />}
					content={
						<Page
							onScrollEnd={onLoadNextPart}
							className={classNames(cls.ArticlesPageRedesigned, {}, [
								className,
							])}
							data-testid={'ArticlesPage'}
						>
							<ArticleInfiniteList className={cls.list} />
							<ArticlePageGreeting />
						</Page>
					}
				/>
			}
			off={
				<Page
					onScrollEnd={onLoadNextPart}
					className={classNames(cls.ArticlesPage, {}, [className])}
					data-testid={'ArticlesPage'}
				>
					<ArticlePageFilters />
					<ArticleInfiniteList className={cls.list} />
					<ArticlePageGreeting />
				</Page>
			}
		/>
	);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			{content}
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
