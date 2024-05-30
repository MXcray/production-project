import { lazy } from "react";

export const MainPageAsync = lazy(() => new Promise(resolve => {
	// @ts-ignore
	// Для теста setTimeout
	setTimeout(() => resolve(import('./MainPage')), 1500)
}))