import { useMemo } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../hooks/auth";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { pageItems } from "../../config/pageItems";
import appConfig from "../../config/appConfig";
import TextButton from "../TextButton/TextButton";
import { logout } from "../../services/AuthService";
import { useMutation } from "react-query";

export default function AdminLayout() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { isLoggedIn, isFetchingUser, user, doLogout } = useAuth();
	const { mutate } = useMutation({ mutationFn: logout });

	const pageTitle = useMemo(() => {
		const item = Object.values(pageItems).find(item => item.url === pathname);

		return item?.pageTitle || "";
	}, [pathname]);

	const handleLogout = () => {
		mutate();
		doLogout();
		navigate(pageItems.login.url);
	};

	if (isFetchingUser) {
		return <LoadingScreen />;
	}

	if (!isLoggedIn) {
		return <Navigate to={pageItems.login.url} />;
	}

	return (
		<main className="bg-sky-100 min-h-screen flex-grow">
			{pageTitle && (
				<Helmet>
					<title>{`${pageTitle} | ${appConfig.appName}`}</title>
				</Helmet>
			)}
			<header className="h-12 px-5 bg-sky-700">
				<div className="container text-white h-full flex justify-between items-center">
					<h1 className="leading-none font-bold text-xl md:text-2xl">{appConfig.appName}</h1>
					<div className="text-xs mt-1">
						<span>{`Hello ${user?.name}! — `}</span>
						<TextButton
							testid="logout-button"
							colorClassName="text-white"
							className="leading-none underline sm:text-sm"
							onClick={handleLogout}
						>
							Log out
						</TextButton>
					</div>
				</div>
			</header>
			<div className="container flex flex-col gap-8 pt-8 md:pb-8">
				<Outlet />
			</div>
		</main>
	);
}
