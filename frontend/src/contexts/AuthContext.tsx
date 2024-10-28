"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";

type AuthContextType = {
    appLoading: boolean;
    user: User | null;
    authenticated: boolean;
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
};

const APP_CONTEXT_DEFAULT_VALUES: AuthContextType = {
    appLoading: false,
    user: null,
    authenticated: false,
    accessToken: "",
    setAccessToken: () => {
    }
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
    const [accessToken, setAccessToken] = useState(APP_CONTEXT_DEFAULT_VALUES.accessToken);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setAuthenticated(!!user);
            setAppLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                appLoading,
                authenticated,
                accessToken,
                setAccessToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
