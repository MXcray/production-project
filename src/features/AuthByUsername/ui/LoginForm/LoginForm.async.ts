import { FC, lazy } from "react";
import { LoginFormProps } from "features/AuthByUsername/ui/LoginForm/LoginForm";

export const LoginFormAsync = lazy<FC<LoginFormProps>>(() => new Promise(resolve => {
	// @ts-ignore
	// Для теста setTimeout
	setTimeout(() => resolve(import('./LoginForm')), 1500)
}))