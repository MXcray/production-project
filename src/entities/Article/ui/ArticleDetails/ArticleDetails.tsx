import { classNames } from "shared/lib/classNames/classNames";
import cls from './ArticleDetails.module.scss';
import { useTranslation } from "react-i18next";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { useSelector } from "react-redux";
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading
} from "../../model/selectors/articleDetails";
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Avatar } from "shared/ui/Avatar/Avatar";
import ViewIcon from "shared/assets/icons/views.svg";
import DateIcon from "shared/assets/icons/date.svg";
import { Icon } from "shared/ui/Icon/Icon";
import { ArticleBlock, ArticleBlockType } from "../../model/types/article";
import { ArticleTextBlockComponent } from "entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent";
import { ArticleImageBlockComponent } from "entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleCodeBlockComponent } from "entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent";

interface ArticleDetailsProps {
	className?: string;
	id: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {

	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const article = useSelector(getArticleDetailsData);
	const error = useSelector(getArticleDetailsError);

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
		case ArticleBlockType.TEXT:
			return <ArticleTextBlockComponent
				key={block.id}
				className={cls.block}
				block={block}
			/>;
		case ArticleBlockType.IMAGE:
			return <ArticleImageBlockComponent
				key={block.id}
				className={cls.block}
				block={block}
			/>;
		case ArticleBlockType.CODE:
			return <ArticleCodeBlockComponent
				key={block.id}
				className={cls.block}
				block={block}
			/>;
		default:
			return null;
		}
	}, []);

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchArticleById(id));
		}
	}, [dispatch, id]);

	let content;

	if (isLoading) {
		content = (
			<>
				<Skeleton className={cls.avatar} width={200} height={200} borderRad={'50%'} />
				<Skeleton className={cls.title} width={300} height={32} />
				<Skeleton className={cls.skeleton} width={600} height={24} />
				<Skeleton className={cls.skeleton} width={'100%'} height={200} />
				<Skeleton className={cls.skeleton} width={'100%'} height={200} />
			</>
		)
	} else if (error) {
		content = (
			<Text
				align={TextAlign.CENTER}
				text={t('Произошла ошибка при загрузке страницы')}
			/>
		)
	} else {
		content = (
			<>
				<div className={cls.avatarWrapper}>
					<Avatar
						size={200}
						src={article?.img}
						className={cls.avatar}
					/>
				</div>
				<Text
					className={cls.title}
					title={article?.title}
					text={article?.subtitle}
					size={TextSize.L}
				/>
				<div className={cls.articleInfo}>
					<Icon className={cls.icon} Svg={ViewIcon} />
					<Text text={String(article?.views)} />
				</div>
				<div className={cls.articleInfo}>
					<Icon className={cls.icon} Svg={DateIcon} />
					<Text text={article?.createdAt} />
				</div>
				{article?.blocks.map(renderBlock)}
			</>
		)
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount >
			<div className={classNames(cls.ArticleDetails, {}, [className])}>
				{content}
			</div>
		</DynamicModuleLoader>
	);
});