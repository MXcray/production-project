import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddNewComment.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
	Button as ButtonDeprecated,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
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
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

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
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<Card padding={'24'} border={'round'} max>
						<HStack
							justify={'between'}
							max
							gap={'16'}
							className={classNames(cls.addNewCommentRedesigned, {}, [
								className,
							])}
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
								variant={'outline'}
								onClick={onSendHandler}
								data-testid={'AddNewComment.Button'}
							>
								{t('Отправить')}
							</Button>
						</HStack>
					</Card>
				}
				off={
					<HStack
						justify={'between'}
						max
						className={classNames(cls.addNewComment, {}, [className])}
						data-testid={'AddNewComment'}
					>
						<InputDeprecated
							className={cls.input}
							placeholder={t('Введите текст коментария')}
							value={text}
							onChange={onCommentTextChange}
							data-testid={'AddNewComment.Input'}
						/>
						<ButtonDeprecated
							theme={ButtonTheme.OUTLINE}
							onClick={onSendHandler}
							data-testid={'AddNewComment.Button'}
						>
							{t('Отправить')}
						</ButtonDeprecated>
					</HStack>
				}
			/>
		</DynamicModuleLoader>
	);
});

export default addNewComment;
