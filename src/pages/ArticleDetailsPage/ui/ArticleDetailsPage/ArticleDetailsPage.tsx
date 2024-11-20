import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss';
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { ArticleDetails } from "@/entities/Article";
import { useParams } from "react-router-dom";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Page } from "@/widgets/Page/Page";
import { articleDetailsPageReducer } from "../../model/slice";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { VStack } from "@/shared/ui/stack";
import { ArticleRecommendationsList } from "@/features/articleRecommendationList";
import { ArticleDetailsComments } from "../../ui/ArticleDetailsComments/ArticleDetailsComments";

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {

	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
			<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				<VStack gap={'16'} max>
					<ArticleDetailsPageHeader />
					<ArticleDetails id={id} />
					<ArticleRecommendationsList/>
					<ArticleDetailsComments id={id}/>
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);