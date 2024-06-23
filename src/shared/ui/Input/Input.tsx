import { classNames } from "shared/lib/classNames/classNames";
import cls from './Input.module.scss';
import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps{
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
	type?: string;
	autofocus?: boolean;
}

// eslint-disable-next-line react/display-name
export const Input = memo((props: InputProps) => {

	const {
		className,
		value,
		onChange,
		type = 'text',
		placeholder,
		autofocus,
		...otherProps
	} = props

	const ref = useRef<HTMLInputElement>();
	const [isFocused, setIsFocused] = useState(false);
	const [caretPos, setCaretPos] = useState(0);

	useEffect(() => {
		if(autofocus) {
			setIsFocused(true);
			ref.current?.focus();
		}
	}, [autofocus]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
		setCaretPos(e.target.value.length);
	}

	const onFocus = () => {
		setIsFocused(true);
	}

	const onBlur = () => {
		setIsFocused(false);
	}

	const onSelect = (e: any) => {
		setCaretPos(e?.target?.selectionEnd || 0);
	}

	return (
		<div className={classNames(cls.InputWrapper, {}, [className])}>
			{placeholder && (
				<div className={cls.placeholder}>
					{`${placeholder}>`}
				</div>
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
					{...otherProps}
				/>
				{isFocused && (
					<span
						className={cls.caret}
						style={{ left: `${caretPos * 9}px` }}
					>
					</span>
				)}
			</div>
		</div>
	);
});