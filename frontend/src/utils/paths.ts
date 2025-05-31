export const path = (root: string, sublink: string) => `${root}${sublink}`;

export const MAIN_SITE_APTH = 'https://haras.space/';

export const ROOT_PATH = '';
export const NOT_FOUND = '/404';
export const ERROR = '/500';

const ROOT_PASSWORD = path(ROOT_PATH, '/password');
const ROOT_USERS = path(ROOT_PATH, '/users');
const ROOT_APPLICATIONS = path(ROOT_PATH, '/post');

export const PATH_AUTH = {
    signIn: path(ROOT_PATH, '/signIn'),
    password: {
        setup: path(ROOT_PASSWORD, '/setup'),
        reset: path(ROOT_PASSWORD, '/reset'),
    }
};

export const PATH_DASHBOARD = {
    root: path(ROOT_PATH, '/'),
    users: {
        root: path(ROOT_USERS, `/list`),
        edit: (id: string | number) => path(ROOT_USERS, `/${id}/edit`),
        new: path(ROOT_USERS, '/new'),
    },
    applications: {
        root: path(ROOT_APPLICATIONS, `/list`),
        edit: (id: string | number) => path(ROOT_APPLICATIONS, `/${id}/edit`),
        new: path(ROOT_APPLICATIONS, '/new'),
        admin:path(ROOT_APPLICATIONS, '/admin')
    }
};