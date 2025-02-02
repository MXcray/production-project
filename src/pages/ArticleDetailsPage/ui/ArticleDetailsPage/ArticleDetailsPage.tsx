import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { VStack } from '@/shared/ui/redesigned/stack';
import { ArticleRecommendationsList } from '@/features/articleRecommendationList';
import { ArticleDetailsComments } from '../../ui/ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/articleRaiting';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return null;
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<StickyContentLayout
						content={
							<Page
								className={classNames(cls.ArticleDetailsPage, {}, [className])}
							>
								<VStack gap={'16'} max>
									<DetailsContainer />
									<ArticleRating articleId={id} />
									<ArticleRecommendationsList />
									<ArticleDetailsComments id={id} />
								</VStack>
							</Page>
						}
						right={<AdditionalInfoContainer />}
					/>
				}
				off={
					<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
						<VStack gap={'16'} max>
							<ArticleDetailsPageHeader />
							<ArticleDetails id={id} />
							<ArticleRating articleId={id} />
							<ArticleRecommendationsList />
							<ArticleDetailsComments id={id} />
						</VStack>
					</Page>
				}
			/>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
