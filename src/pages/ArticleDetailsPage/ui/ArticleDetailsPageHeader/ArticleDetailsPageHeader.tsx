import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import { getCanEditArticle } from '../../model/selectors/article';
import { HStack } from '@/shared/ui/deprecated/stack';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';

interface ArticleDetailsPageHeaderProps {
	className?: string;
}

export const ArticleDetailsPageHeader = memo(
	({ className }: ArticleDetailsPageHeaderProps) => {
		const { t } = useTranslation();
		const navigate = useNavigate();
		const canEdit = useSelector(getCanEditArticle);
		const article = useSelector(getArticleDetailsData);

		const onBackToList = useCallback(() => {
			navigate(getRouteArticles());
		}, [navigate]);

		const onEditArticle = useCallback(() => {
			if (article) {
				navigate(getRouteArticleEdit(article.id));
			}
		}, [article, navigate]);

		return (
			<HStack
				justify={'between'}
				max
				className={classNames('', {}, [className])}
			>
				<Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
					{t('Назад к списку')}
				</Button>
				{canEdit && (
					<Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
						{t('Редактировать')}
					</Button>
				)}
			</HStack>
		);
	},
);
