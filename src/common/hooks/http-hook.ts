import {useCallback, useState} from "react";
import {apiUrl} from "../../config/api";
import {RecoverPasswordRequest,EditPasswordRequest, ActivateUserRequest, CreateHrRequest, AuthLoginRequest} from 'types';

export type ReqBody = (
    | AuthLoginRequest
    | CreateHrRequest
    | EditPasswordRequest
    | RecoverPasswordRequest
    | ActivateUserRequest
    | FormData
    | null
)

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>();


    let statusError = 500;
    const sendRequest = useCallback(
        async (
            url: string,
            method = 'GET',
            body: ReqBody = null,
            headers = {}
        ) => {
            try {
                setIsLoading(true);
                const response = await fetch(`${apiUrl}${url}`, {
                    method,
                    headers,
                    body: body && {body: body instanceof FormData ? body : JSON.stringify(body)}.body,
                });

                const responseData = await response.json();
                setIsLoading(false);
                if (!responseData.isSuccess) {
                    setError(responseData.message);
                    return responseData;
                }
                return responseData;
            } catch (e: any) {
                setError(statusError === 500 ? 'Ops... Proszę spróbować za kilka minut.' : e.message);
                setIsLoading(false);
                throw e;
            }
        }, []);
    const clearError = () => {
        setError(null);
    };
    return {isLoading, error, sendRequest, setError, clearError};
};