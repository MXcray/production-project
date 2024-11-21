import { classNames } from "@/shared/lib/classNames/classNames";
import { Page } from "@/widgets/Page/Page";
import { VStack } from "@/shared/ui/stack/VStack/VStack";
import { EditableProfileCard } from "@/features/editableProfileCard";
import { useParams } from "react-router-dom";
import { ProfileRating } from "@/features/profileRating";

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {

	const { id } = useParams<{id: string}>();

	if (!id) {
		return null;
	}

	return (
		<Page className={classNames('', {}, [className])}>
			<VStack gap={'16'} max>
				<EditableProfileCard id={id}/>
				<ProfileRating profileId={id} />
			</VStack>
		</Page>
	);
};

export default ProfilePage;