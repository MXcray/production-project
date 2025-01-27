import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddNewComment.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { useSelector } from 'react-redux';
import {
	getAddNewCommentError,
	getAddNewCommentText,
} from '../../model/selectors/addNewCommentSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
	addNewCommentActions,
	addNewCommentReducer,
} from '../../model/slices/addNewCommentSlice';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/stack';

export interface addNewCommentProps {
	className?: string;
	onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
	addNewComment: addNewCommentReducer,
};

const addNewComment = memo((props: addNewCommentProps) => {
	const { className, onSendComment } = props;
	const { t } = useTranslation();
	const text = useSelector(getAddNewCommentText);
	const error = useSelector(getAddNewCommentError);
	const dispatch = useAppDispatch();

	const onCommentTextChange = useCallback(
		(value: string) => {
			dispatch(addNewCommentActions.setText(value));
		},
		[dispatch],
	);

	const onSendHandler = useCallback(() => {
		onSendComment(text || '');
		onCommentTextChange('');
	}, [onCommentTextChange, onSendComment, text]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<HStack
				justify={'between'}
				max
				className={classNames(cls.addNewComment, {}, [className])}
				data-testid={'AddNewComment'}
			>
				<Input
					className={cls.input}
					placeholder={t('Введите текст коментария')}
					value={text}
					onChange={onCommentTextChange}
					data-testid={'AddNewComment.Input'}
				/>
				<Button
					theme={ButtonTheme.OUTLINE}
					onClick={onSendHandler}
					data-testid={'AddNewComment.Button'}
				>
					{t('Отправить')}
				</Button>
			</HStack>
		</DynamicModuleLoader>
	);
});

export default addNewComment;
