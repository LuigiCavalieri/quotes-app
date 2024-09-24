import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AuthForm from "../components/AuthForm/AuthForm";
import AuthFormTitle from "../components/AuthFormTitle/AuthFormTitle";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import RouterLink from "../components/RouterLink/RouterLink";
import appConfig from "../config/appConfig";
import { pageItems } from "../config/pageItems";
import { AuthFormValues } from "../components/AuthForm/AuthForm.types";
import { useMutation } from "react-query";
import { ResponseError } from "../types/error";
import { signup } from "../services/AuthService";
import { EMPTY_STRING } from "../constants";

export default function SignupPage() {
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const { isLoading, error, mutate } = useMutation<unknown, ResponseError, AuthFormValues>({
		mutationFn: signup,
		onSuccess: () => setShowSuccessMessage(true),
	});

	return (
		<AuthLayout>
			<Helmet>
				<title>{`${pageItems.signup.pageTitle} | ${appConfig.appName}`}</title>
			</Helmet>
			{!showSuccessMessage && <AuthFormTitle>{pageItems.signup.pageTitle}</AuthFormTitle>}
			{showSuccessMessage ? (
				<p className="text-lg text-center">
					<strong>Your account is almost ready.</strong>
					<br />
					<br />
					Please, check your mailbox, you should have received an email with instructions on how to
					activate your account.
					<br />
					<br />
					Thank you!
				</p>
			) : (
				<>
					<AuthForm
						type="signup"
						errorMessage={error?.message || EMPTY_STRING}
						isLoading={isLoading}
						onSubmit={mutate}
					/>
					<p>
						Do you already have an account? <RouterLink to={pageItems.login.url}>Log in</RouterLink>
					</p>
				</>
			)}
		</AuthLayout>
	);
}
