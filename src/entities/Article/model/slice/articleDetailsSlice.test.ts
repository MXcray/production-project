import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { articleDetailsReducer } from './articleDetailsSlice';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import {
	ArticleBlockType,
	ArticleType,
} from '../../model/consts/articleConsts';

const data: Article = {
	id: '1',
	title: 'Javascript news',
	subtitle: 'Что нового в JS за 2022 год?',
	user: {
		id: '1',
		username: 'Admin',
	},
	img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
	views: 1022,
	createdAt: '26.02.2022',
	type: [ArticleType.IT],
	blocks: [
		{
			id: '1',
			type: ArticleBlockType.TEXT,
			title: 'Заголовок этого блока',
			paragraphs: [
				'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
				'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
			],
		},
	],
};

describe('articleDetailsSlice.test', () => {
	test('test update profile service pending', () => {
		const state: DeepPartial<ArticleDetailsSchema> = {
			isLoading: false,
		};
		expect(
			articleDetailsReducer(
				state as ArticleDetailsSchema,
				fetchArticleById.pending,
			),
		).toEqual({
			isLoading: true,
		});
	});

	test('test update profile service fulfilled', () => {
		const state: DeepPartial<ArticleDetailsSchema> = {
			isLoading: true,
		};
		expect(
			articleDetailsReducer(
				state as ArticleDetailsSchema,
				fetchArticleById.fulfilled(data, '', ''),
			),
		).toEqual({
			isLoading: false,
			data,
		});
	});
});
