import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import ViewIcon from '@/shared/assets/icons/views.svg';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { useNavigate } from 'react-router-dom';
import { AppLink } from '@/shared/ui/AppLink';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
	const { className, article, view, target } = props;

	const { t } = useTranslation();
	const navigate = useNavigate();

	// const onOpenArticle = useCallback(() => {
	// 	navigate(RoutePath.article_details + article.id)
	// }, [article.id, navigate]);

	const types = <Text text={article.type.join(', ')} className={cls.types} />;
	const views = (
		<>
			<Text text={String(article.views)} className={cls.views} />
			<Icon Svg={ViewIcon} />
		</>
	);

	if (view === ArticleView.BIG) {
		let textBlock = article.blocks.find(
			(block) => block.type === ArticleBlockType.TEXT,
		) as ArticleTextBlock;
		return (
			<div
				className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
				data-testid={'ArticleListItem'}
			>
				<Card className={cls.card}>
					<div className={cls.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text text={article.user.username} className={cls.username} />
						<Text text={article.createdAt} className={cls.date} />
					</div>
					<Text title={article.title} className={cls.title} />
					{types}
					<AppImage
						fallback={<Skeleton width={'100%'} height={250} />}
						src={article.img}
						alt={article.title}
						className={cls.img}
					/>
					{textBlock && (
						<ArticleTextBlockComponent
							block={textBlock}
							className={cls.textBlock}
						/>
					)}
					<div className={cls.footer}>
						<AppLink target={target} to={getRouteArticleDetails(article.id)}>
							<Button theme={ButtonTheme.OUTLINE}>
								{t('Читать далее...')}
							</Button>
						</AppLink>
						{views}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<AppLink
			target={target}
			to={getRouteArticleDetails(article.id)}
			className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
			data-testid={'ArticleListItem'}
		>
			<Card className={cls.card}>
				<div className={cls.imageWrapper}>
					<AppImage
						fallback={<Skeleton width={200} height={200} />}
						src={article.img}
						alt={article.title}
						className={cls.img}
					/>
					<Text text={article.createdAt} className={cls.date} />
				</div>
				<div className={cls.infoWrapper}>
					{types}
					{views}
				</div>
				<Text text={article.title} className={cls.title} />
			</Card>
		</AppLink>
	);
});
