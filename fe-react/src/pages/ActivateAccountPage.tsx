import { ReactNode, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { pageItems } from "../config/pageItems";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import { Navigate, useSearchParams } from "react-router-dom";
import { activateAccount } from "../services/AuthService";
import { isEmail } from "../utils/strings";
import { ResponseError } from "../types/error";
import { EMPTY_STRING, ErrorCodes } from "../constants";
import RouterLink from "../components/RouterLink/RouterLink";
import { useQuery } from "react-query";

export default function ActivateAccountPage() {
	const [searchParams] = useSearchParams();
	const [errorMessage, setErrorMessage] = useState<ReactNode>(null);

	const email = searchParams.get("email") || EMPTY_STRING;
	const activationToken = searchParams.get("activationToken") || EMPTY_STRING;
	const searchParamsExist = email && activationToken;
	const searchParamsAreValid = useMemo(
		() => isEmail(email) && /^[a-z0-9-]+$/i.test(activationToken),
		[email, activationToken]
	);

	const { isLoading } = useQuery<unknown, ResponseError>({
		enabled: searchParamsAreValid && !errorMessage,
		queryFn: () => activateAccount(email, activationToken),
		onError: error => {
			if (error.message === ErrorCodes.accountCannotBeActivated) {
				setErrorMessage(
					<>
						<strong>Your account cannot be activated.</strong>
						<br />
						Maybe your activation link has expired.
						<br />
						<br />
						Please, <RouterLink to={pageItems.signup.url}>try to sign up anew</RouterLink>.
					</>
				);
			} else {
				setErrorMessage(
					<>
						<strong>Something didn't work</strong> as expected,
						<br />
						please try again later.
					</>
				);
			}
		},
	});

	useEffect(() => {
		if (!searchParamsAreValid) {
			setErrorMessage(
				<>
					<strong>Your account cannot be activated.</strong>
					<br />
					Please check your activation link and retry.
				</>
			);
		}
	}, [searchParamsAreValid]);

	if (!searchParamsExist) {
		return <Navigate to={pageItems.signup.url} />;
	}

	return (
		<AuthLayout>
			<Helmet>
				<title>{pageItems.activateAccount.pageTitle}</title>
			</Helmet>
			<div className="text-lg text-center flex flex-grow justify-center items-center ">
				{errorMessage ? (
					<p>{errorMessage}</p>
				) : isLoading ? (
					<p>Your account is being activated...</p>
				) : (
					<p>
						Your account is active!
						<br />
						<RouterLink to={pageItems.login.url}>Log in</RouterLink>
					</p>
				)}
			</div>
		</AuthLayout>
	);
}
