import { lazy } from "react";

export const ArticleDetailsPageAsync = lazy(() => new Promise(resolve => {
	// @ts-ignore
	// Для теста setTimeout
	setTimeout(() => resolve(import('./ArticleDetailsPage')), 1500)
}))