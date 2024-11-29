import { RouteProps } from "react-router-dom";
// eslint-disable-next-line anton-plugin/layer-imports
import { UserRole } from "@/entities/User";

export type appRoutesProps = RouteProps & {
	authOnly?: boolean;
	roles?: UserRole[];
}