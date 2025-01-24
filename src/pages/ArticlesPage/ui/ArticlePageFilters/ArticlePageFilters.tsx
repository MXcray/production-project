import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlePageFilters.module.scss';
import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';

import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlePageFiltersProps {
	className?: string;
}

export const ArticlePageFilters = memo(
	({ className }: ArticlePageFiltersProps) => {
		const { t } = useTranslation();
		const {
			onChangeView,
			onChangeSort,
			onChangeOrder,
			onChangeType,
			onChangeSearch,
			sort,
			type,
			view,
			search,
			order,
		} = useArticleFilters();

		return (
			<div className={classNames(cls.ArticlePageFilters, {}, [className])}>
				<div className={cls.sortWrapper}>
					<ArticleSortSelector
						sort={sort}
						order={order}
						onChangeSort={onChangeSort}
						onChangeOrder={onChangeOrder}
					/>
					<ArticleViewSelector view={view} onViewClick={onChangeView} />
				</div>
				<Card className={cls.search}>
					<Input
						placeholder={t('Поиск')}
						value={search}
						onChange={onChangeSearch}
					/>
				</Card>
				<ArticleTypeTabs
					value={type}
					onChangeType={onChangeType}
					className={cls.tabs}
				/>
			</div>
		);
	},
);
