import { classNames } from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPageHeader.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { getArticleDetailsData } from "entities/Article";
import { getCanEditArticle } from "pages/ArticleDetailsPage/model/selectors/article";

interface ArticleDetailsPageHeaderProps {
	className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: ArticleDetailsPageHeaderProps) => {

	const { t } = useTranslation();
	const navigate = useNavigate();
	const canEdit = useSelector(getCanEditArticle);
	const article = useSelector(getArticleDetailsData);

	const onBackToList = useCallback(() => {
		navigate(RoutePath.articles);
	}, [navigate])

	const onEditArticle = useCallback(() => {
		navigate(`${RoutePath.article_details}${article?.id}/edit`)
	}, [article?.id, navigate])

	return (
		<div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
			<Button
				theme={ButtonTheme.OUTLINE}
				onClick={onBackToList}
			>
				{t('Назад к списку')}
			</Button>
			{canEdit && <Button
				theme={ButtonTheme.OUTLINE}
				onClick={onEditArticle}
				className={cls.editBtn}
			>
				{t('Редактировать')}
			</Button>}
		</div>
	);
});