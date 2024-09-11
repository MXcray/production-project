import { classNames } from "shared/lib/classNames/classNames";
import cls from './CommentList.module.scss';
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Text } from "shared/ui/Text/Text";
import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from '../../model/types/comments';

interface CommentListProps {
	className?: string;
	comments?: Comment[];
	isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {

	const {
		className ,
		isLoading,
		comments,
	} = props;

	const { t } = useTranslation();

	return (
		<div className={classNames(cls.CommentList, {}, [className])}>
			{comments?.length
				? comments.map((comment) => (
					<CommentCard className={cls.comment} key={comment.id} comment={comment} />
				))
				: <Text text={t('Коментарии отсутсвуют')} />
			}
		</div>
	);
});