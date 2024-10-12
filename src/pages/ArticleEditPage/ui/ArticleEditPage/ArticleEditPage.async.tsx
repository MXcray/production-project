import { lazy } from "react";

export const ArticleEditPageAsync = lazy(() => new Promise(resolve => {
	// @ts-ignore
	// Для теста setTimeout
	setTimeout(() => resolve(import('./ArticleEditPage')), 400);
}))