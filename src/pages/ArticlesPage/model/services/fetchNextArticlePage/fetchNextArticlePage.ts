import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
	getArticlesPageHasMore,
	getArticlesPageIsLoading,
	getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlePage = createAsyncThunk<
	void,
	void,
	ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (_, thunkAPI) => {
	const { getState, dispatch } = thunkAPI;

	const page = getArticlesPageNum(getState());
	const hasMore = getArticlesPageHasMore(getState());
	const isLoading = getArticlesPageIsLoading(getState());

	if (hasMore && !isLoading) {
		dispatch(articlesPageActions.setPage(page + 1));
		dispatch(fetchArticlesList({}));
	}
});
