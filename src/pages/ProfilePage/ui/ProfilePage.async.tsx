import { lazy } from "react";

export const ProfilePageAsync = lazy(() => new Promise(resolve => {
	// @ts-ignore
	// Для теста setTimeout
	setTimeout(() => resolve(import('./ProfilePage')), 1500)
}))