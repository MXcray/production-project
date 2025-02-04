import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import {
	Button as ButtonDeprecated,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { getRouteArticleCreate } from '@/shared/const/router';
import { HStack } from '@/shared/ui/redesigned/stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation();
	const [isAuthModal, setIsAuthModal] = useState(false);
	const authData = useSelector(getUserAuthData);

	const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

	const RedesignedNavbar = () => {
		return (
			<header className={classNames(cls.NavbarRedesigned, {}, [className])}>
				<HStack gap={'16'} className={cls.actions}>
					<NotificationButton />
					<AvatarDropdown />
				</HStack>
			</header>
		);
	};

	const DeprecatedNavbar = () => {
		return (
			<header className={classNames(cls.Navbar, {}, [className])}>
				<Text
					className={cls.appName}
					title={t('My App')}
					theme={TextTheme.INVERTED}
				/>
				<AppLink
					to={getRouteArticleCreate()}
					theme={AppLinkTheme.SECONDARY}
					className={cls.createBtn}
				>
					{t('Создать статью')}
				</AppLink>
				<HStack gap={'16'} className={cls.actions}>
					<NotificationButton />
					<AvatarDropdown />
				</HStack>
			</header>
		);
	};

	const mainClass = toggleFeatures({
		name: 'isAppRedesigned',
		on: () => cls.NavbarRedesigned,
		off: () => cls.Navbar,
	});

	if (authData) {
		return (
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={<RedesignedNavbar />}
				off={<DeprecatedNavbar />}
			/>
		);
	}

	return (
		<header className={classNames(mainClass, {}, [className])}>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<>
						<Button
							variant={'clear'}
							className={cls.links}
							onClick={onShowModal}
						>
							{t('Войти')}
						</Button>

						{isAuthModal && (
							<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
						)}
					</>
				}
				off={
					<>
						<ButtonDeprecated
							theme={ButtonTheme.CLEAR_INVERTED}
							className={cls.links}
							onClick={onShowModal}
						>
							{t('Войти')}
						</ButtonDeprecated>

						{isAuthModal && (
							<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
						)}
					</>
				}
			/>
		</header>
	);
});
