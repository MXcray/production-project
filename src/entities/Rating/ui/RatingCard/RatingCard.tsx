import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
	Button as ButtonDeprecated,
	ButtonSize,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

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
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<>
						<Text text={feedbackTitle} />
						<Input
							value={feedback}
							onChange={setFeedback}
							placeholder={t('Ваш отзыв')}
							data-testid={'RatingCard.Input'}
						/>
					</>
				}
				off={
					<>
						<TextDeprecated text={feedbackTitle} />
						<InputDeprecated
							value={feedback}
							onChange={setFeedback}
							placeholder={t('Ваш отзыв')}
							data-testid={'RatingCard.Input'}
						/>
					</>
				}
			/>
		</>
	);

	const content = (
		<>
			<VStack align={'center'} gap={'8'}>
				<ToggleFeatures
					feature={'isAppRedesigned'}
					on={<Text title={starsCount ? t('Спасибо за оценку!') : title} />}
					off={
						<TextDeprecated
							title={starsCount ? t('Спасибо за оценку!') : title}
						/>
					}
				/>

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
						<ToggleFeatures
							feature={'isAppRedesigned'}
							on={
								<HStack max gap={'16'} justify={'end'}>
									<Button
										onClick={cancelHandler}
										data-testid={'RatingCard.Close'}
									>
										{t('Закрыть')}
									</Button>
									<Button
										onClick={acceptHandler}
										data-testid={'RatingCard.Send'}
									>
										{t('Отправить')}
									</Button>
								</HStack>
							}
							off={
								<HStack max gap={'16'} justify={'end'}>
									<ButtonDeprecated
										onClick={cancelHandler}
										theme={ButtonTheme.OUTLINE_RED}
										data-testid={'RatingCard.Close'}
									>
										{t('Закрыть')}
									</ButtonDeprecated>
									<ButtonDeprecated
										onClick={acceptHandler}
										data-testid={'RatingCard.Send'}
									>
										{t('Отправить')}
									</ButtonDeprecated>
								</HStack>
							}
						/>
					</VStack>
				</Modal>
			</BrowserView>

			<MobileView>
				<Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
					<VStack gap={'32'}>
						{modalContent}
						<ToggleFeatures
							feature={'isAppRedesigned'}
							on={
								<Button fullWidth onClick={acceptHandler} size={'l'}>
									{t('Отправить')}
								</Button>
							}
							off={
								<ButtonDeprecated
									fullWidth
									onClick={acceptHandler}
									size={ButtonSize.L}
								>
									{t('Отправить')}
								</ButtonDeprecated>
							}
						/>
					</VStack>
				</Drawer>
			</MobileView>
		</>
	);

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<Card padding={'24'} border={'partial'} max>
					{content}
				</Card>
			}
			off={
				<CardDeprecated className={className} max data-testid={'RatingCard'}>
					{content}
				</CardDeprecated>
			}
		/>
	);
});
