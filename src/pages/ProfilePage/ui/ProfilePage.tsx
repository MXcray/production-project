import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/stack';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { useParams } from 'react-router-dom';
import { ProfileRating } from '@/features/profileRating';
import { ToggleFeatures } from '@/shared/lib/features';

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return null;
	}

	const ProfilePageDeprecated = () => {
		return (
			<Page
				data-testid={'ProfilePage'}
				className={classNames('', {}, [className])}
			>
				<VStack gap={'16'} max>
					<EditableProfileCard id={id} />
					<ProfileRating profileId={id} />
				</VStack>
			</Page>
		);
	};

	const ProfilePageRedesigned = () => {
		return (
			<Page
				data-testid={'ProfilePage'}
				className={classNames('', {}, [className])}
			>
				<VStack gap={'16'} max>
					<EditableProfileCard id={id} />
				</VStack>
			</Page>
		);
	};

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={<ProfilePageRedesigned />}
			off={<ProfilePageDeprecated />}
		/>
	);
};

export default ProfilePage;
