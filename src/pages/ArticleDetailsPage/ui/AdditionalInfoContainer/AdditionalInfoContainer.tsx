import { memo, useCallback } from 'react';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Card } from '@/shared/ui/redesigned/Card';
import { getArticleDetailsData } from '@/entities/Article';
import { useSelector } from 'react-redux';
import cls from './AdditionalInfoContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleEdit } from '@/shared/const/router';

export const AdditionalInfoContainer = memo(() => {
	const article = useSelector(getArticleDetailsData);
	const navigate = useNavigate();

	const onEditArticle = useCallback(() => {
		if (article) {
			navigate(getRouteArticleEdit(article.id));
		}
	}, [article, navigate]);

	if (!article) {
		return null;
	}

	return (
		<Card padding={'24'} border={'round'} className={cls.card}>
			<ArticleAdditionalInfo
				onEdit={onEditArticle}
				author={article.user}
				views={article.views}
				createdAt={article.createdAt}
			/>
		</Card>
	);
});
