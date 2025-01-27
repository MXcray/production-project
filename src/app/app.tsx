import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';

const App = () => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const inited = useSelector(getUserInited);

	useEffect(() => {
		dispatch(initAuthData());
	}, [dispatch]);

	if (!inited) {
		return <PageLoader />;
	}

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<div className={classNames('app_redesigned', {}, [theme])}>
					<Suspense fallback={''}>
						<MainLayout
							header={<Navbar className={'navbar'} />}
							content={<AppRouter />}
							sidebar={<Sidebar />}
						/>
					</Suspense>
				</div>
			}
			off={
				<div className={classNames('app', {}, [theme])}>
					<Suspense fallback={''}>
						<Navbar className={'navbar'} />
						<div className={'content-page'}>
							<Sidebar />
							<AppRouter />
						</div>
					</Suspense>
				</div>
			}
		/>
	);

	// return (
	// 	<div className={classNames('app', {}, [variant])}>
	// 		<Suspense fallback={''}>
	// 			<Navbar className={'navbar'} />
	// 			<div className={'content-page'}>
	// 				<Sidebar />
	// 				{inited && <AppRouter />}
	// 			</div>
	// 		</Suspense>
	// 	</div>
	// );
};

export default App;
