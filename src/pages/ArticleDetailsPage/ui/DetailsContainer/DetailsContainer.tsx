import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';

interface DetailsContainerProps {
	className?: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
	const { className } = props;
	const { id } = useParams<{ id: string }>();

	return (
		<Card max className={className} padding={'24'} border={'partial'}>
			<ArticleDetails id={id} />
		</Card>
	);
});
