import { Helmet } from "react-helmet-async";
import RouterLink from "../components/RouterLink/RouterLink";
import { pageItems } from "../config/pageItems";
import appConfig from "../config/appConfig";

export default function NotFoundPage() {
	return (
		<div className="h-full flex flex-col items-center justify-center gap-2">
			<Helmet>
				<title>{`404 | ${appConfig.appName}`}</title>
			</Helmet>
			<h3 className="text-xl">Page Not Found</h3>
			<p>
				<RouterLink to={pageItems.list.url}>Back to Home</RouterLink>
			</p>
		</div>
	);
}
