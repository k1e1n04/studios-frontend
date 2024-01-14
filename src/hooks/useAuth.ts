import {useRouter} from "next/navigation";
import {useCallback, useMemo} from "react";
import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {StudyErrorResponseDto} from "@/types/Study/StudyErrorResponseDto";
import {LoginResponseDto} from "@/types/Auth/LoginResponseDto";
import { setCookie } from 'cookies-next';
import {useRecoilState} from "recoil";
import {isLoggedInAtom} from "@/states/isLoggedInAtom";


export const useAuth = () => {
    const router = useRouter();
    const [isLoggedIn, setLoggedIn] = useRecoilState(isLoggedInAtom);

    const authApi = useMemo((): AxiosInstance => {
        const axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            timeout: 15000,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                "x-api-key": process.env.NEXT_PUBLIC_APIGATEWAY_API_KEY,
            },
        });
        axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError<StudyErrorResponseDto>) => {
                if (!error.response) {
                    router.push("/error/internal_server_error");
                }
                if (
                    error.code === "ECONNABORTED" ||
                    error.message.includes("timeout")
                ) {
                    return Promise.reject(error);
                }
                if (error.response) {
                    switch (error.response.status) {
                        case axios.HttpStatusCode.BadRequest:
                            break;
                        case axios.HttpStatusCode.NotFound:
                            router.push("/error/not_found");
                            break;
                        case axios.HttpStatusCode.InternalServerError:
                            router.push("/error/internal_server_error");
                            break;
                        default:
                            router.push("/error/internal_server_error");
                    }
                }
                return Promise.reject(error);
            },
        );
        return axiosInstance;
    }, []);

    const login = useCallback(
        async (
        email: string,
        password: string
    ) => {
        return await authApi
            .post("/auth/login", {
                email,
                password,
            })
            .then(
                async (
                    response: AxiosResponse<LoginResponseDto>
                ): Promise<(number | LoginResponseDto)[]> => {
                    setCookie('accessToken', 'response.data.access_token', { secure: true })
                    setCookie('refreshToken', 'response.data.refresh_token', { secure: true })
                    setLoggedIn(true);
                    router.push("/study/list");
                    return [response.status, response.data];
                }
            )
            .catch((error) => [error.response.status, error.response.data]);
    },
        [authApi]
    );
    return {
        login,
    } as const;
}