"use client"

import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { User } from "firebase/auth";

type AuthContextType = {
	appLoading: boolean;
	user: User | null;
	authenticated: boolean;
};

const APP_CONTEXT_DEFAULT_VALUES: AuthContextType = {
	appLoading: false,
	user: null,
	authenticated: false,
};
export const AuthContext = createContext<AuthContextType>(APP_CONTEXT_DEFAULT_VALUES);

type AppContextProviderProps = {
	children: ReactNode;
};

export const AuthContextProvider = (props: AppContextProviderProps) => {
	const { children } = props;
	const [user, setUser] = useState(APP_CONTEXT_DEFAULT_VALUES.user);
	const [appLoading, setAppLoading] = useState(false);
	const [authenticated, setAuthenticated] = useState(APP_CONTEXT_DEFAULT_VALUES.authenticated);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setAuthenticated(!!user);
			setAppLoading(false);
		})
		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				appLoading,
				authenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
