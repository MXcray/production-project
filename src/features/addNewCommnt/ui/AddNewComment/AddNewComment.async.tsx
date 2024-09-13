import { FC, lazy } from "react";
import { addNewCommentProps } from "./AddNewComment";

export const addNewCommentAsync = lazy<FC<addNewCommentProps>>(() => new Promise(resolve => {
	// @ts-ignore
	// Для теста setTimeout
	setTimeout(() => resolve(import('./AddNewComment')), 1500)
}))