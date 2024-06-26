import { classNames } from "shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss';
import { useTranslation } from "react-i18next";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";

interface LoginFormProps {
	className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {

	const { t } = useTranslation();

	return (
		<div className={classNames(cls.LoginForm, {}, [className])}>
			<Input
				type="text"
				className={cls.input}
				placeholder={t('Введите username')}
				autofocus
			/>
			<Input
				type="text"
				className={cls.input}
				placeholder={t('Введите пароль')}
			/>
			<Button className={cls.loginBtn} theme={ButtonTheme.BACKGROUND_INVERTED}>
				{t('Войти')}
			</Button>
		</div>
	);
};