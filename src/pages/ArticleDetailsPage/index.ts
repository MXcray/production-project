import { ArticleDetailsPageSchema } from './model/types';
import { ArticleDetailsCommentSchema } from './model/types/ArticleDetailsCommentSchema';
import { ArticleDetailsRecommendationsSchema } from './model/types/ArticleDetailsRecommendationsSchema';
import { ArticleDetailsPageAsync as ArticleDetails } from './ui/ArticleDetailsPage/ArticleDetailsPage.async';

export {
	ArticleDetails,
	type ArticleDetailsCommentSchema,
	type ArticleDetailsRecommendationsSchema,
	type ArticleDetailsPageSchema,
};
