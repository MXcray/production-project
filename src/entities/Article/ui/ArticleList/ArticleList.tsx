import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ArticleList.module.scss';
import { useTranslation } from "react-i18next";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { Article } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextAlign, TextSize } from "@/shared/ui/Text";
import { ArticleView } from "../../model/consts/articleConsts";

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	target?: HTMLAttributeAnchorTarget;
	view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
	return new Array(view === ArticleView.SMALL ? 9 : 3)
		.fill(0)
		.map((item, index) => (
			<ArticleListItemSkeleton view={view} key={index} className={cls.card} />
		))
}

export const ArticleList = memo((props: ArticleListProps) => {

	const {
		className,
		articles,
		isLoading,
		target,
		view = ArticleView.SMALL,
	} = props

	const { t } = useTranslation();

	const renderArticle = (article: Article) => {
		return (
			<ArticleListItem
				article={article}
				view={view}
				className={cls.card}
				key={article.id}
				target={target}
			/>
		)
	}

	if (!isLoading && !articles.length) {
		return (
			<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
				<Text
					size={TextSize.L}
					text={t('Статья не найдена')}
					align={TextAlign.CENTER}
				/>
			</div>
		)
	}

	return (
		<div
			className={classNames(cls.ArticleList, {}, [className, cls[view]])}
			data-testid={'ArticleList'}
		>
			{articles.length > 0
				? articles.map(renderArticle)
				: null}
			{isLoading && getSkeletons(view)}
		</div>
	);
});