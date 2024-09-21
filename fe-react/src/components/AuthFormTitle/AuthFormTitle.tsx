import { AuthFormTitleProps } from "./AuthFormTitle.types";

export default function AuthFormTitle({ children }: AuthFormTitleProps) {
	return <h3 className="text-center text-3xl font-semibold mb-8 mt-2">{children}</h3>;
}
