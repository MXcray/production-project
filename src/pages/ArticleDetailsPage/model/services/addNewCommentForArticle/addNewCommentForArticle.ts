import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getArticleDetailsData } from "@/entities/Article/model/selectors/articleDetails";
import {
	fetchCommentsByArticleId
} from "../../services/fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addNewCommentForArticle = createAsyncThunk<
	Comment,
	string,
	ThunkConfig<string>
>(
	'articleDetails/addNewCommentForArticle',
	async (text, thunkAPI) => {
		const {
			dispatch,
			extra,
			rejectWithValue,
			getState,
		} = thunkAPI;

		const userData = getUserAuthData(getState());
		const article = getArticleDetailsData(getState());

		if (!userData || !text || !article) {
			return rejectWithValue('no data');
		}

		try {
			const response = await extra.api.post<Comment>('/comments', {
				articleId: article?.id,
				userId: userData.id,
				text,
			});

			if (!response.data) {
				throw new Error();
			}

			dispatch(fetchCommentsByArticleId(article.id));

			return response.data;
		} catch (e) {
			return rejectWithValue('error');
		}
	}
)