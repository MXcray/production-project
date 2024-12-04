import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ArticleSortSelector.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useMemo } from "react";
import { Select, SelectOption } from "@/shared/ui/Select";
import { SortOrder } from "@/shared/types/sort";
import { ArticleSortField } from "@/entities/Article";

interface ArticleSortSelectorProps {
	className?: string;
	sort: ArticleSortField;
	order: SortOrder;
	onChangeSort: (newSort: ArticleSortField) => void;
	onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {

	const {
		className,
		sort,
		order,
		onChangeSort,
		onChangeOrder
	} = props;
	const { t } = useTranslation();

	const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
		{
			value: 'asc',
			content: t('возрастанию'),
		},
		{
			value: 'desc',
			content: t('убыванию'),
		},
	], [t])

	const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
		{
			value: ArticleSortField.CREATED,
			content: t('дате создания'),
		},
		{
			value: ArticleSortField.VIEW,
			content: t('просмотрам'),
		},
		{
			value: ArticleSortField.TITLE,
			content: t('названию'),
		},
	], [t])

	return (
		<div className={classNames(cls.ArticleSortSelector, {}, [className])}>
			<Select<ArticleSortField> //Явное указание (Необязательно)
				options={sortFieldOptions}
				label={t('Сортировать по')}
				value={sort}
				onChange={onChangeSort}
			/>
			<Select
				options={orderOptions}
				label={t('по')}
				value={order}
				onChange={onChangeOrder}
				className={cls.order}
			/>
		</div>
	);
});