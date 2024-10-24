import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { StoreProvider } from "app/providers/StoreProvider";
import { ErrorBoundary } from "app/providers/ErrorBoundary";
import App from "./app/app";
import "./app/styles/index.scss";
import "./shared/config/i18n/i18n";

render(
	<BrowserRouter>
		<StoreProvider>
			<ErrorBoundary>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</ErrorBoundary>
		</StoreProvider>
	</BrowserRouter>,
	document.getElementById('root')
)

