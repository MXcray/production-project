import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import React, {
	InputHTMLAttributes,
	memo,
	useEffect,
	useRef,
	useState,
} from 'react';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	autofocus?: boolean;
	readonly?: boolean;
}

/**
 * Устарел, новые компоненты в папке redesigned
 * @deprecated
 */
export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChange,
		type = 'text',
		placeholder,
		autofocus,
		readonly,
		...otherProps
	} = props;

	const ref = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [caretPos, setCaretPos] = useState(0);

	const isCaretVisible = !readonly && isFocused;

	useEffect(() => {
		if (autofocus) {
			setIsFocused(true);
			ref.current?.focus();
		}
	}, [autofocus]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
		setCaretPos(e.target.value.length);
	};

	const onFocus = () => {
		setIsFocused(true);
	};

	const onBlur = () => {
		setIsFocused(false);
	};

	const onSelect = (e: any) => {
		setCaretPos(e?.target?.selectionEnd || 0);
	};

	const mods: Mods = {
		[cls.readonly]: readonly,
	};

	return (
		<div className={classNames(cls.InputWrapper, mods, [className])}>
			{placeholder && (
				<div className={cls.placeholder}>{`${placeholder}>`}</div>
			)}
			<div className={cls.caretWrapper}>
				<input
					ref={ref}
					type={type}
					value={value}
					onChange={onChangeHandler}
					className={cls.input}
					onFocus={onFocus}
					onBlur={onBlur}
					onSelect={onSelect}
					readOnly={readonly}
					{...otherProps}
				/>
				{isCaretVisible && (
					<span
						className={cls.caret}
						style={{ left: `${caretPos * 9}px` }}
					></span>
				)}
			</div>
		</div>
	);
});
