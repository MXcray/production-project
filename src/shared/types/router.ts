import { RouteProps } from "react-router-dom";
import { UserRole } from "@/entities/User";

export type appRoutesProps = RouteProps & {
	authOnly?: boolean;
	roles?: UserRole[];
}