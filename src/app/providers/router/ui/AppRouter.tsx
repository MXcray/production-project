import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "widgets/PageLoader";
import { appRoutesProps, routeConfig } from "shared/config/routeConfig/routeConfig";
import { RequireAuth } from "app/providers/router/ui/RequireAuth";

const AppRouter = () => {

	const renderWithWrapper = useCallback((route: appRoutesProps) => {
		const element = (
			<div className={'page-wrapper'}>
				<Suspense fallback={<div><PageLoader/></div>}>
					{route.element}
				</Suspense>
			</div>
		)
		return (
			<Route
				key={route.path}
				path={route.path}
				element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
			/>
		)
	}, [])

	return (
		<Routes>
			{Object.values(routeConfig).map(renderWithWrapper)}
		</Routes>
	);
};

export default memo(AppRouter);