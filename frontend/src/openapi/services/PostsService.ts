/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostsService {
    /**
     * Створити пост
     * @param requestBody
     * @returns any Пост створенно
     * @throws ApiError
     */
    public static postPosts(
        requestBody: {
            title: string;
            content: string;
            isAdminOnly?: boolean;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/posts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Отримати всі пости
     * @returns any Список постів
     * @throws ApiError
     */
    public static getPosts(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts',
        });
    }
    /**
     * Отримати пост по ID
     * @param id
     * @returns any Пост знайдено
     * @throws ApiError
     */
    public static getPosts1(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Пост не знайдено`,
            },
        });
    }
    /**
     * Оновити пост
     * @param id
     * @param requestBody
     * @returns any Пост оновлено
     * @throws ApiError
     */
    public static putPosts(
        id: string,
        requestBody: {
            title?: string;
            content?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/posts/{id}',
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
     * Видалити пост
     * @param id
     * @returns any Пост видалено
     * @throws ApiError
     */
    public static deletePosts(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Немає доступу`,
            },
        });
    }
    /**
     * Отримати пости тільки для адмінів
     * @returns any Тільки для адмінів
     * @throws ApiError
     */
    public static getPostsAdminOnly(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts/admin-only',
            errors: {
                403: `Немає прав`,
            },
        });
    }
}
