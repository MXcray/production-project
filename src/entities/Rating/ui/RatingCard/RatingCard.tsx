import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Card } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

interface RatingCardProps {
	className?: string;
	title?: string;
	feedbackTitle?: string;
	hasFeedback?: boolean;
	onCancel?: (starsCount: number) => void;
	onAccept?: (starsCount: number, feedback?: string) => void;
	rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
	const {
		className,
		onCancel,
		hasFeedback,
		title,
		onAccept,
		feedbackTitle,
		rate = 0,
	} = props;
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [starsCount, setStarsCount] = useState(rate);
	const [feedback, setFeedback] = useState('');

	const onSelectStars = useCallback(
		(selectedStarsCount: number) => {
			setStarsCount(selectedStarsCount);
			if (hasFeedback) {
				setIsModalOpen(true);
			} else {
				onAccept?.(selectedStarsCount);
			}
		},
		[hasFeedback, onAccept],
	);

	const acceptHandler = useCallback(() => {
		setIsModalOpen(false);
		onAccept?.(starsCount, feedback);
	}, [feedback, onAccept, starsCount]);

	const cancelHandler = useCallback(() => {
		setIsModalOpen(false);
		onCancel?.(starsCount);
	}, [onCancel, starsCount]);

	const modalContent = (
		<>
			<Text text={feedbackTitle} />
			<Input
				value={feedback}
				onChange={setFeedback}
				placeholder={t('Ваш отзыв')}
				data-testid={'RatingCard.Input'}
			/>
		</>
	);

	return (
		<Card className={className} max data-testid={'RatingCard'}>
			<VStack align={'center'} gap={'8'}>
				<Text title={starsCount ? t('Спасибо за оценку!') : title} />
				<StarRating
					selectedStars={starsCount}
					size={40}
					onSelect={onSelectStars}
				/>
			</VStack>

			<BrowserView>
				<Modal isOpen={isModalOpen} lazy>
					<VStack max gap={'32'}>
						{modalContent}
						<HStack max gap={'16'} justify={'end'}>
							<Button
								onClick={cancelHandler}
								theme={ButtonTheme.OUTLINE_RED}
								data-testid={'RatingCard.Close'}
							>
								{t('Закрыть')}
							</Button>
							<Button onClick={acceptHandler} data-testid={'RatingCard.Send'}>
								{t('Отправить')}
							</Button>
						</HStack>
					</VStack>
				</Modal>
			</BrowserView>

			<MobileView>
				<Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
					<VStack gap={'32'}>
						{modalContent}
						<Button fullWidth onClick={acceptHandler} size={ButtonSize.L}>
							{t('Отправить')}
						</Button>
					</VStack>
				</Drawer>
			</MobileView>
		</Card>
	);
});
