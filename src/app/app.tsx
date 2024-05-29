import './styles/index.scss';
import {Link} from "react-router-dom";
import {classNames} from "shared/lib/classNames/classNames";
import {useTheme} from "app/providers/ThemeProvider";
import {AppRouter} from "app/providers/router";
import {Navbar} from "widgets/Navbar";

const App = () => {

	const {theme, toggleTheme} = useTheme();

	return (
			<div className={classNames('app', {}, [theme])}>

				<button onClick={toggleTheme}>Toggle theme</button>
				<Navbar className={'navbar'} />
				<AppRouter />

			</div>
	);
};

export default App;