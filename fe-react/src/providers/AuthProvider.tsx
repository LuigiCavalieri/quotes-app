import { ReactNode, useCallback, useLayoutEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/user";
import { getStorageItem, removeStorageItem, setStorageItem } from "../library/local-storage";
import { useQuery, useQueryClient } from "react-query";
import { me } from "../services/AuthService";
import { LocalStorageKeys } from "../constants";

interface AuthProviderProps {
	children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
	const queryClient = useQueryClient();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [shouldFetchUser, setShouldFetchUser] = useState(false);

	useQuery({
		queryFn: me,
		enabled: shouldFetchUser,
		onSuccess: data => {
			setUser(data);
			setIsLoggedIn(true);
			setShouldFetchUser(false);
		},
		onError: () => {
			doLogout();
			setShouldFetchUser(false);
		},
	});

	const doLogin = () => {
		setIsLoggedIn(true);
		setShouldFetchUser(true);
		setStorageItem(LocalStorageKeys.isLoggedIn, true);
	};

	const doLogout = useCallback(() => {
		setIsLoggedIn(false);
		queryClient.removeQueries();
		removeStorageItem(LocalStorageKeys.isLoggedIn);
	}, [queryClient]);

	useLayoutEffect(() => {
		if (getStorageItem(LocalStorageKeys.isLoggedIn)) {
			setShouldFetchUser(true);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				isFetchingUser: shouldFetchUser,
				user,
				doLogin,
				doLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
