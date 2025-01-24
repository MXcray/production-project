import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsProps {
	className?: string;
	value: ArticleType;
	onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
	const { className, value, onChangeType } = props;

	const { t } = useTranslation();

	const typeTabs = useMemo<TabItem[]>(
		() => [
			{
				value: ArticleType.ALL,
				content: t('Все статьи'),
			},
			{
				value: ArticleType.IT,
				content: t('Айти'),
			},
			{
				value: ArticleType.ECONOMY,
				content: t('Экономика'),
			},
			{
				value: ArticleType.SCIENCE,
				content: t('Наука'),
			},
		],
		[t],
	);

	const onTabClick = useCallback(
		(tab: TabItem) => {
			onChangeType(tab.value as ArticleType);
		},
		[onChangeType],
	);

	const ArticleTypeTabsDeprecated = () => {
		return (
			<TabsDeprecated
				tabs={typeTabs}
				value={value}
				onTabClick={onTabClick}
				className={className}
			/>
		);
	};

	const ArticleTypeTabsRedesigned = () => {
		return (
			<Tabs
				direction={'column'}
				tabs={typeTabs}
				value={value}
				onTabClick={onTabClick}
				className={className}
			/>
		);
	};

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={<ArticleTypeTabsRedesigned />}
			off={<ArticleTypeTabsDeprecated />}
		/>
	);
});
