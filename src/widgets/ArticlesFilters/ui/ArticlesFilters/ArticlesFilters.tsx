import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { VStack } from '@/shared/ui/redesigned/stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/redesigned/Input';

interface ArticlesFiltersProps {
	className?: string;
	sort: ArticleSortField;
	order: SortOrder;
	type: ArticleType;
	search: string;
	onChangeSort: (newSort: ArticleSortField) => void;
	onChangeOrder: (newOrder: SortOrder) => void;
	onChangeType: (type: ArticleType) => void;
	onChangeSearch: (value: string) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
	const {
		className,
		sort,
		order,
		onChangeSort,
		onChangeOrder,
		onChangeSearch,
		search,
		type,
		onChangeType,
	} = props;
	const { t } = useTranslation();

	return (
		<Card
			className={classNames(cls.ArticlesFilters, {}, [className])}
			padding={'24'}
		>
			<VStack gap={'32'}>
				<Input
					placeholder={t('Поиск')}
					value={search}
					onChange={onChangeSearch}
				/>
				<ArticleTypeTabs
					value={type}
					onChangeType={onChangeType}
					className={cls.tabs}
				/>
				<ArticleSortSelector
					sort={sort}
					order={order}
					onChangeSort={onChangeSort}
					onChangeOrder={onChangeOrder}
				/>
			</VStack>
		</Card>
	);
});
