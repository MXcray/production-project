import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';
import { useTranslation } from 'react-i18next';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { memo, useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useSelector } from 'react-redux';
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import {
	Text as TextDeprecated,
	TextAlign,
	TextSize,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import ViewIcon from '@/shared/assets/icons/views.svg';
import DateIcon from '@/shared/assets/icons/date.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/stack';
import { renderArticleBlock } from './renderBlock';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

interface ArticleDetailsProps {
	className?: string;
	id?: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
	const article = useSelector(getArticleDetailsData);

	return (
		<>
			<HStack justify={'center'} max className={cls.avatarWrapper}>
				<Avatar size={200} src={article?.img} className={cls.avatar} />
			</HStack>
			<VStack gap={'4'} data-testid={'ArticleDetails.Info'}>
				<TextDeprecated
					className={cls.title}
					title={article?.title}
					text={article?.subtitle}
					size={TextSize.L}
				/>
				<HStack gap={'8'} className={cls.articleInfo}>
					<Icon className={cls.icon} Svg={ViewIcon} />
					<TextDeprecated text={String(article?.views)} />
				</HStack>
				<HStack gap={'8'} className={cls.articleInfo}>
					<Icon className={cls.icon} Svg={DateIcon} />
					<TextDeprecated text={article?.createdAt} />
				</HStack>
			</VStack>
			{article?.blocks.map(renderArticleBlock)}
		</>
	);
};
const Redesigned = () => {
	const article = useSelector(getArticleDetailsData);

	return (
		<>
			<Text title={article?.title} size={'l'} bold />
			<Text title={article?.subtitle} />
			<AppImage
				className={cls.img}
				fallback={<Skeleton width={'100%'} height={420} borderRad={'16px'} />}
				src={article?.img}
			/>
			{article?.blocks.map(renderArticleBlock)}
		</>
	);
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const article = useSelector(getArticleDetailsData);
	const error = useSelector(getArticleDetailsError);

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchArticleById(id));
		}
	}, [dispatch, id]);

	let content;

	if (isLoading) {
		content = (
			<>
				<SkeletonDeprecated
					className={cls.avatar}
					width={200}
					height={200}
					borderRad={'50%'}
				/>
				<SkeletonDeprecated className={cls.title} width={300} height={32} />
				<SkeletonDeprecated className={cls.skeleton} width={600} height={24} />
				<SkeletonDeprecated
					className={cls.skeleton}
					width={'100%'}
					height={200}
				/>
				<SkeletonDeprecated
					className={cls.skeleton}
					width={'100%'}
					height={200}
				/>
			</>
		);
	} else if (error) {
		content = (
			<TextDeprecated
				align={TextAlign.CENTER}
				text={t('Произошла ошибка при загрузке страницы')}
			/>
		);
	} else {
		content = (
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={<Redesigned />}
				off={<Deprecated />}
			/>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<VStack
				gap={'16'}
				max
				className={classNames(cls.ArticleDetails, {}, [className])}
			>
				{content}
			</VStack>
		</DynamicModuleLoader>
	);
});
