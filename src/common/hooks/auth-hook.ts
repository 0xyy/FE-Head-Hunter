import {useAppDispatch, useAppSelector} from "./redux-hook";
import {useHttpClient} from "./http-hook";
import {useCallback, useEffect} from "react";
import {logIn, logOut} from "../../redux/slices/auth-slice";

export const useAuth = () => {
    const {isLoggedIn, userRole} = useAppSelector((store) => store.auth);
    const {sendRequest, error, clearError, isLoading} = useHttpClient();
    const dispatch = useAppDispatch();

    const login = useCallback((userFullName: string, userId: string, userRole: number, avatarUrl: string | null) => {
        dispatch(logIn({
            isLoggedIn: true,
            userFullName,
            userId,
            userRole,
            avatarUrl,
        }));
    }, []);

    const logout = useCallback(() => {
        dispatch(logOut(true));
    }, []);

    useEffect(() => {
        (async () => {
            const data = await sendRequest('/auth/auto-login');
            if (data.isSuccess) {
                return login(data.userFullName, data.userId, data.userRole, data.avatarUrl);
            } else clearError();
        })();
    }, []);

    return {
        isLoggedIn,
        userRole,
        error,
        clearError,
        isLoading,
        login,
        logout,
    };
};