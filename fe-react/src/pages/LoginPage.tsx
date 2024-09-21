import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import RouterLink from "../components/RouterLink/RouterLink";
import { pageItems } from "../config/pageItems";
import AuthForm from "../components/AuthForm/AuthForm";
import { AuthFormValues } from "../components/AuthForm/AuthForm.types";
import { useAuth } from "../hooks/auth";
import AuthFormTitle from "../components/AuthFormTitle/AuthFormTitle";

export default function LoginPage() {
	const [formDisabled, setFormDisabled] = useState(false);

	const { isMutating, errorMessage, doLogin } = useAuth();

	const handleOnSubmit = (formValues: AuthFormValues) => {
		setFormDisabled(true);
		doLogin(formValues, { onError: () => setFormDisabled(false) });
	};

	return (
		<AuthLayout>
			<Helmet>
				<title>{pageItems.login.pageTitle}</title>
			</Helmet>
			<AuthFormTitle>{pageItems.login.pageTitle}</AuthFormTitle>
			<AuthForm
				type="login"
				errorMessage={errorMessage}
				isLoading={isMutating}
				disabled={formDisabled}
				onSubmit={handleOnSubmit}
			/>
			<p>
				Need an account? <RouterLink to="/signup">Sign up</RouterLink>
			</p>
		</AuthLayout>
	);
}
