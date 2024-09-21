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
	const [formDisabled, setFormDisabled] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const { isMutating, errorMessage, doSignup } = useAuth();

	const handleOnSubmit = (formValues: AuthFormValues) => {
		setFormDisabled(true);
		doSignup(formValues, {
			onError: () => setFormDisabled(false),
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
				<div className="flex-grow flex items-center">
					<p className="text-lg text-center">
						<strong>Your account is almost ready.</strong>
						<br />
						<br />
						Please, check your mailbox, you should have received an email with instructions on how
						to activate your account.
						<br />
						<br />
						Thank you!
					</p>
				</div>
			) : (
				<>
					<AuthForm
						type="signup"
						errorMessage={errorMessage}
						isLoading={isMutating}
						disabled={formDisabled}
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
