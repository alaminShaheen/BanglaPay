"use client";

import { onAuthStateChanged, User, UserCredential } from "firebase/auth";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { auth } from "@/firebaseConfig";
import { addAxiosAuthHeader } from "@/lib/axiosInstance";

type AuthContextType = {
    appLoading: boolean;
    user: User | null;
    authenticated: boolean;
    onUserLogin: (userCredentials: UserCredential) => Promise<void>;
};

const APP_CONTEXT_DEFAULT_VALUES: AuthContextType = {
    appLoading: false,
    user: null,
    authenticated: false,
    onUserLogin: async (userCredentials: UserCredential) => {}
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
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setAuthenticated(!!user);
            setAppLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (accessToken) {
            addAxiosAuthHeader(accessToken);
        }
    }, [accessToken]);

    const onUserLogin = useCallback(async (userCredentials: UserCredential) => {
        const token = await userCredentials.user?.getIdToken();
        if (token) {
            addAxiosAuthHeader(token);
            setAccessToken(token);
            setUser(userCredentials.user);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                appLoading,
                authenticated,
                onUserLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
