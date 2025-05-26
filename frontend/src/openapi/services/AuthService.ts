/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Реєстрація нового користувача
     * @param requestBody
     * @returns any Користувач зареєстрован
     * @throws ApiError
     */
    public static postAuthRegister(
        requestBody: {
            username: string;
            email: string;
            password: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Помилка реєстрації`,
            },
        });
    }
    /**
     * Вхід користувача
     * @param requestBody
     * @returns any Вдалий вхід, повертається accessToken
     * @throws ApiError
     */
    public static postAuthLogin(
        requestBody: {
            email: string;
            password: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Невірні дані користувача`,
                500: `Помилка сервера при вході`,
            },
        });
    }
    /**
     * Отримати усіх користувачів
     * @returns any Список користувачів
     * @throws ApiError
     */
    public static getAuthUsers(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/users',
            errors: {
                403: `Недостатньо прав`,
            },
        });
    }
    /**
     * Отримати користувача по ID
     * @param id
     * @returns any Користувач знайден
     * @throws ApiError
     */
    public static getAuthUsers1(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Користувача не знайдено`,
            },
        });
    }
    /**
     * Оновити користувача
     * @param id
     * @param requestBody
     * @returns any Оновлено
     * @throws ApiError
     */
    public static putAuthUsers(
        id: string,
        requestBody: {
            username?: string;
            email?: string;
            password?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/auth/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Немає прав`,
            },
        });
    }
    /**
     * Видалити користувача по ID
     * @param id
     * @returns any Видалено
     * @throws ApiError
     */
    public static deleteAuthUsers(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/auth/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Немає прав`,
            },
        });
    }
}
