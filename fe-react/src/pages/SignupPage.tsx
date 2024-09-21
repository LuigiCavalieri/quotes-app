import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AuthForm from "../components/AuthForm/AuthForm";
import AuthFormTitle from "../components/AuthFormTitle/AuthFormTitle";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import RouterLink from "../components/RouterLink/RouterLink";
import appConfig from "../config/appConfig";
import { pageItems } from "../config/pageItems";
import { AuthFormValues } from "../components/AuthForm/AuthForm.types";
import { useAuth } from "../hooks/auth";

export default function SignupPage() {
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const { isMutating, errorMessage, doSignup } = useAuth();

	const handleOnSubmit = (formValues: AuthFormValues) => {
		doSignup(formValues, {
			onSuccess: () => setShowSuccessMessage(true),
		});
	};

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
						errorMessage={errorMessage}
						isLoading={isMutating}
						onSubmit={handleOnSubmit}
					/>
					<p>
						Do you already have an account? <RouterLink to={pageItems.login.url}>Log in</RouterLink>
					</p>
				</>
			)}
		</AuthLayout>
	);
}
