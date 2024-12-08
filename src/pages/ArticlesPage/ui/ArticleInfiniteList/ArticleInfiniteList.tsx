import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getArticles } from '../../model/slices/articlePageSlice';
import {
	getArticlesPageError,
	getArticlesPageIsLoading,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { ArticleList } from '@/entities/Article';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text';

interface ArticleInfiniteListProps {
	className?: string;
}

export const ArticleInfiniteList = memo(
	({ className }: ArticleInfiniteListProps) => {
		const { t } = useTranslation();
		const articles = useSelector(getArticles.selectAll);
		const view = useSelector(getArticlesPageView);
		const isLoading = useSelector(getArticlesPageIsLoading);
		const error = useSelector(getArticlesPageError);

		if (error) {
			return <Text text={t('Ошибка при загрузке статей')} />;
		}

		return (
			<ArticleList
				isLoading={isLoading}
				view={view}
				articles={articles}
				className={className}
			/>
		);
	},
);
