// // import 'server-only';
// import axios, { AxiosResponse } from 'axios';
// import { Agent } from 'https';
// import { AuthService, OpenAPI } from '@root/openapi';
// ro

// const AxiosInstance = axios.create({
//   baseURL: OpenAPI.BASE,
//   httpsAgent: new Agent({
//     rejectUnauthorized: false,
//   }),
// });

// let accessToken = '';
// let expiresIn = new Date(0);

// // export const getORDSBearerToken = async () => {
// //   if (expiresIn <= new Date()) {
// //     const { access_token, expires_in } = await AuthService.;
// //     expiresIn = new Date(Date.now() + expires_in * 1000);
// //     accessToken = access_token;
// //   }

// //   return accessToken;
// // };

// // AxiosInstance.interceptors.request.use(async (request) => {
// //   try {
// //     if (!request.url?.includes('/api/oauth/token')) {
// //       const token = await getORDSBearerToken();
// //       request.headers.Authorization = `Bearer ${token}`;
// //     }
// //     // console.info(`[${new Date().toISOString()}] ORDS REQUEST`, {
// //     //   url: request.url,
// //     //   method: request.method,
// //     //   headers: request.headers,
// //     //   data: request.data,
// //     // });
// //   } finally {
// //     return request;
// //   }
// // });

// AxiosInstance.interceptors.request.use((request) => {
//   if (
//     !request.url?.includes('/api/service/frontend/login') &&
//     expiresIn <= new Date()
//   ) {
//     // localStorage.removeItem("accessToken");
//     delete axios.defaults.headers.common.Authorization;
//     window.location.replace('/signIn');
//     return new Promise(() => { });
//   }

//   return request;
// });

// AxiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     try {
//       // console.info(`[${new Date().toISOString()}] ORDS RESPONSE`, {
//       //   url: response.config.url,
//       //   status: response.status,
//       //   data: JSON.stringify(response.data),
//       // });
//     } finally {
//       return response;
//     }
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       window.location.replace('/signIn')
//     //   originalRequest.headers.Authorization = `Bearer ${token}`;
//       return AxiosInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   },
// );

// export default AxiosInstance;



/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */


import 'server-only';
import axios from 'axios';
import { OpenAPI } from '@root/openapi/core/OpenAPI';
import getSession from '@application/actions/getSession';


const AxiosInstance = axios.create({
  baseURL: OpenAPI.BASE,
});

AxiosInstance.interceptors.request.use(async (request) => {

    const session = await getSession();
    if (session !== null)
      request.headers.ApiAuthorization = `Bearer ${session}`;
 
  return request;
});


export default AxiosInstance;
