import {useAppDispatch, useAppSelector} from "./redux-hook";
import {useHttpClient} from "./http-hook";
import {useEffect} from "react";
import {logIn} from "../../redux/slices/auth-slice";

export const useAuth = () => {
    const {isLoggedIn, userRole} = useAppSelector((store) => store.auth);
    const {sendRequest, error, clearError, isLoading} = useHttpClient();
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async () => {
            const data = await sendRequest('/auth/auto-login');
            if (data.isSuccess) {
                return dispatch(logIn({
                    isLoggedIn: data.isSuccess,
                    userFullName: data.userFullName,
                    userId: data.userId,
                    userRole: data.userRole,
                    avatarUrl: data.avatarUrl,
                }));
            } else clearError();
        })();
    }, []);


    //@TODO Add logout timer.
    return {
        isLoggedIn,
        userRole,
        error,
        clearError,
        isLoading,

    }
}