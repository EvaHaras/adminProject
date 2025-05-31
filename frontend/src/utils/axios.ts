


import axios, { AxiosResponse } from 'axios';
import { OpenAPI } from '@root/openapi/core/OpenAPI';
import getSession from '@application/actions/getSession';


const AxiosInstance = axios.create({
  baseURL: OpenAPI.BASE,
});

AxiosInstance.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (session) {
    request.headers.Authorization = `Bearer ${session.encryptedToken}`;
  }
  return request;
});






export default AxiosInstance;
