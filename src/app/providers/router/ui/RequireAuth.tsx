import { useSelector } from "react-redux";
import { getUserAuthData, getUserRoles, UserRole } from "@/entities/User";
import { Navigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { getRouteForbidden, getRouteMain } from "@/shared/const/router";

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
		return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
	}

	if (!hasRequiredRoles) {
		return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
	}

	return children;
}