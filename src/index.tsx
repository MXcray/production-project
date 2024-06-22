// eslint-disable-next-line react/no-deprecated
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { StoreProvider } from "app/providers/StoreProvider";
import { ErrorBoundary } from "app/providers/ErrorBoundary";
import App from "./app/app";
import "./app/styles/index.scss";
import "./shared/config/i18n/i18n";

render(
	<StoreProvider>
		<BrowserRouter>
			<ErrorBoundary>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</ErrorBoundary>
		</BrowserRouter>
	</StoreProvider>,
	document.getElementById('root')
)

