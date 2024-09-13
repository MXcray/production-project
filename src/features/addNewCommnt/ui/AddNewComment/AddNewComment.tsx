import { classNames } from "shared/lib/classNames/classNames";
import cls from './AddNewComment.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import {
	getAddNewCommentError,
	getAddNewCommentText
} from "../../model/selectors/addNewCommentSelectors";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { addNewCommentActions, addNewCommentReducer } from "../../model/slices/addNewCommentSlice";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

export interface addNewCommentProps {
	className?: string;
	onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
	addNewComment: addNewCommentReducer
}

const addNewComment = memo((props: addNewCommentProps) => {

	const {
		className,
		onSendComment,
	} = props;
	const { t } = useTranslation();
	const text = useSelector(getAddNewCommentText);
	const error = useSelector(getAddNewCommentError);
	const dispatch = useAppDispatch();

	const onCommentTextChange = useCallback((value: string) => {
		dispatch(addNewCommentActions.setText(value));
	}, [dispatch]);

	const onSendHandler = useCallback(() => {
		onSendComment(text || '');
		onCommentTextChange('');
	}, [onCommentTextChange, onSendComment, text])

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.addNewComment, {}, [className])}>
				<Input
					className={cls.input}
					placeholder={t('Введите текст коментария')}
					value={text}
					onChange={onCommentTextChange}
				/>
				<Button
					theme={ButtonTheme.OUTLINE}
					onClick={onSendHandler}
				>
					{t('Отправить')}
				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default addNewComment;