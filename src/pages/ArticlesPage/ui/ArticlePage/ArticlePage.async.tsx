import { lazy } from "react";

export const ArticlePageAsync = lazy(() => new Promise(resolve => {
	// @ts-ignore
	// Для теста setTimeout
	setTimeout(() => resolve(import('./ArticlePage')), 400);
}))