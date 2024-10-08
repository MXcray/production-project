import React from 'react';
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";
// import { BugButton } from "app/providers/ErrorBoundary";

const MainPage = () => {
	const { t } = useTranslation();

	return (
		<Page>
			{/*<BugButton />*/}
			{t('Главная страница')}
		</Page>
	);
};

export default MainPage;