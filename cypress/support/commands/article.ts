import { Article } from "../../../src/entities/Article";

const defaultArticle = {
	title: "Научная статья - Биология",
	subtitle: "БиологиЯ",
	img: "https://st.depositphotos.com/1554103/2410/i/450/depositphotos_24108857" +
		"-stock-photo-ecology-eco-bio-enviroment-text.jpg",
	views: 1022,
	createdAt: "26.02.2022",
	userId: "1",
	type: [
		"SCIENCE"
	],
	blocks: []
};

export const createArticle = (article?: Article) => {
	return cy.request({
		method: 'POST',
		url: `http://localhost:8000/articles`,
		headers: { Authorization: 'asdad' },
		body: article ?? defaultArticle,
	}).then(resp => resp.body);
};

export const removeArticle = (articleId: string) => {
	cy.request({
	 method: 'DELETE',
	 url: `http://localhost:8000/articles/${articleId}`,
	 headers: { Authorization: 'asdad' },
	})
}

declare global {
	namespace Cypress {
		interface Chainable {
			createArticle(article?: Article): Chainable<Article>;
			removeArticle(articleId: string): Chainable<void>;
		}
	}
}