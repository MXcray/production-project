import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isMobile } from 'react-device-detect';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

export const ArticlePageGreeting = memo(() => {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const { isArticlePageWasOpen } = useJsonSettings();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!isArticlePageWasOpen) {
			setIsOpen(true);
			dispatch(saveJsonSettings({ isArticlePageWasOpen: true }));
		}
	}, [dispatch, isArticlePageWasOpen]);

	const onClose = () => {
		setIsOpen(false);
	};

	const text = (
		<Text
			title={t('Добро пожаловать на страницу статей')}
			text={t(
				'Здесь вы можете искать и просматривать статьи на различные темы',
			)}
		/>
	);

	if (isMobile) {
		return (
			<Drawer lazy isOpen={isOpen} onClose={onClose}>
				{text}
			</Drawer>
		);
	}

	return (
		<Modal lazy isOpen={isOpen} onClose={onClose}>
			{text}
		</Modal>
	);
});
