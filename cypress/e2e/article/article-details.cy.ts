let currentArticleId = '';

describe('Пользователь заходит на страницу статьи', () => {
	beforeEach(() => {
		cy.login();
		cy.createArticle().then((article) => {
			currentArticleId = article.id;
			cy.visit(`articles/${article.id}`)
		});
	})
	// Создаем статью - тестим - удаляем
	afterEach(() => {
		cy.removeArticle(currentArticleId);
	});

	it('и видит содержимое статьи', () => {
		cy.getByTestId('ArticleDetails.Info').should('exist');
	});

	it('и видит список рекомендаций', () => {
		cy.getByTestId('ArticleRecommendationsList').should('exist');
	});

	it('и оставляет коментарий', () => {
		cy.getByTestId('ArticleDetails.Info');
		cy.getByTestId('AddNewComment').scrollIntoView();
		cy.addComment('test');
		cy.getByTestId('CommendCard.Content').should('have.length', 1);
	});

	it('и ставит оценку', () => {
		cy.getByTestId('ArticleDetails.Info');
		cy.getByTestId('RatingCard').scrollIntoView();
		cy.setRate(5, 'feedback');
		cy.get(`[data-selected=true]`).should('have.length', 5);
	});

	it('и ставит оценку (пример с стабом на фикстуре)', () => {
		cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
		cy.getByTestId('ArticleDetails.Info');
		cy.getByTestId('RatingCard').scrollIntoView();
		cy.setRate(5, 'feedback');
		cy.get(`[data-selected=true]`).should('have.length', 5);
	});
})