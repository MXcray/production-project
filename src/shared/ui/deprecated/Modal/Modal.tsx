import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import React, { ReactNode } from 'react';
import { Portal } from '../../redesigned/Portal/Portal';
import { Overlay } from '../../redesigned/Overlay/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

const ANIMATION_DELAY = 200;

/**
 * Устарел, новые компоненты в папке redesigned
 * @deprecated
 */
export const Modal = (props: ModalProps) => {
	const { className, children, isOpen, onClose, lazy } = props;

	const { close, isClosing, isMounted } = useModal({
		animationDelay: ANIMATION_DELAY,
		onClose,
		isOpen,
	});

	const { theme } = useTheme();

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	};

	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div
				className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}
			>
				<Overlay className={cls.overlay} onClick={close} />
				<div className={cls.content}>{children}</div>
			</div>
		</Portal>
	);
};
