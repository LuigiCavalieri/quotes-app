import { Helmet } from "react-helmet-async";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import RouterLink from "../components/RouterLink/RouterLink";
import { pageItems } from "../config/pageItems";
import AuthForm from "../components/AuthForm/AuthForm";
import { useAuth } from "../hooks/auth";
import AuthFormTitle from "../components/AuthFormTitle/AuthFormTitle";
import { useMutation } from "react-query";
import { ResponseError } from "../types/error";
import { AuthFormValues } from "../components/AuthForm/AuthForm.types";
import { login } from "../services/AuthService";
import { EMPTY_STRING } from "../constants";

export default function LoginPage() {
	const { doLogin } = useAuth();
	const { isLoading, error, mutate } = useMutation<unknown, ResponseError, AuthFormValues>({
		mutationFn: login,
		onSuccess: () => doLogin(),
	});

	return (
		<AuthLayout>
			<Helmet>
				<title>{pageItems.login.pageTitle}</title>
			</Helmet>
			<AuthFormTitle>{pageItems.login.pageTitle}</AuthFormTitle>
			<AuthForm
				type="login"
				errorMessage={error?.message || EMPTY_STRING}
				isLoading={isLoading}
				onSubmit={mutate}
			/>
			<p>
				Need an account? <RouterLink to="/signup">Sign up</RouterLink>
			</p>
		</AuthLayout>
	);
}
