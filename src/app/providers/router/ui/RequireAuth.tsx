import { useSelector } from "react-redux";
import { getUserAuthData, getUserRoles, UserRole } from "entities/User";
import { Navigate, useLocation } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useMemo } from "react";

interface RequireAuthProps {
	children: JSX.Element;
	roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
	let auth = useSelector(getUserAuthData);
	let location = useLocation();
	const userRoles = useSelector(getUserRoles);

	const hasRequiredRoles = useMemo(() => {
		if (!roles) {
			return true;
		}

		return roles.some(requiredRole => {
			return userRoles?.includes(requiredRole);
		})
	}, [roles, userRoles]);

	if (!auth) {
		return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
	}

	if (!hasRequiredRoles) {
		return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
	}

	return children;
}