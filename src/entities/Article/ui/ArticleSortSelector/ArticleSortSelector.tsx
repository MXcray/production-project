import { classNames } from "shared/lib/classNames/classNames";
import cls from './ArticleSortSelector.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo } from "react";
import { Select, SelectOption } from "shared/ui/Select/Select";
import { ArticleSortField } from "../../model/types/article";
import { SortOrder } from "shared/types";

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

	const orderOptions = useMemo<SelectOption[]>(() => [
		{
			value: 'asc',
			content: t('возрастанию'),
		},
		{
			value: 'desc',
			content: t('убыванию'),
		},
	], [t])

	const sortFieldOptions = useMemo<SelectOption[]>(() => [
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

	const changeSortHandler = useCallback((newSort: string) => {
		onChangeSort(newSort as ArticleSortField);
	}, [onChangeSort])

	const changeOrderHandler = useCallback((newOrder: string) => {
		onChangeOrder(newOrder as SortOrder);
	}, [onChangeOrder])

	return (
		<div className={classNames(cls.ArticleSortSelector, {}, [className])}>
			<Select
				options={sortFieldOptions}
				label={t('Сортировать по')}
				value={sort}
				onChange={changeSortHandler}
			/>
			<Select
				options={orderOptions}
				label={t('по')}
				value={order}
				onChange={changeOrderHandler}
				className={cls.order}
			/>
		</div>
	);
});