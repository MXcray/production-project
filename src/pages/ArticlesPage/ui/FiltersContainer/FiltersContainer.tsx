import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
	className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
	const { className } = props;
	const {
		sort,
		type,
		order,
		search,
		onChangeSort,
		onChangeOrder,
		onChangeSearch,
		onChangeType,
	} = useArticleFilters();

	return (
		<ArticlesFilters
			sort={sort}
			order={order}
			search={search}
			type={type}
			onChangeSort={onChangeSort}
			onChangeOrder={onChangeOrder}
			onChangeType={onChangeType}
			onChangeSearch={onChangeSearch}
			className={className}
		></ArticlesFilters>
	);
});
