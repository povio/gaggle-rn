import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import type { ZodType } from "zod";

interface RequestInfo<Res> {
  resSchema: Res;
}

type Method = "get" | "post" | "put" | "delete";

const MethodHasBody: Record<Method, boolean> = {
  get: false,
  post: true,
  put: true,
  delete: false,
};

export class RestClient {
  private client: AxiosInstance;

  constructor({
    config,
  }: {
    config?: AxiosRequestConfig;
  } = {}) {
    this.client = axios.create(config);
    this.client.interceptors.request.use(
      (config) => {
        // attach token to request header
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  public async get<Res extends ZodType>(url: string, requestInfo: RequestInfo<Res>, config?: AxiosRequestConfig) {
    return this.makeRequest(requestInfo, "get", url, undefined, config);
  }

  public async post<Res extends ZodType>(
    url: string,
    requestInfo: RequestInfo<Res>,
    data?: any,
    config?: AxiosRequestConfig,
  ) {
    return this.makeRequest(requestInfo, "post", url, data, config);
  }

  public async put<Res extends ZodType>(
    url: string,
    requestInfo: RequestInfo<Res>,
    data?: any,
    config?: AxiosRequestConfig,
  ) {
    return this.makeRequest(requestInfo, "put", url, data, config);
  }

  public async delete<Res extends ZodType>(url: string, requestInfo: RequestInfo<Res>, config?: AxiosRequestConfig) {
    return this.makeRequest(requestInfo, "delete", url, undefined, config);
  }

  private async makeRequest<Res extends ZodType>(
    requestInfo: RequestInfo<Res>,
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<Res["_output"]> {
    try {
      let res: AxiosResponse;

      if (MethodHasBody[method]) {
        res = await this.client[method](url, data, config);
      } else {
        res = await this.client[method](url, config);
      }

      return requestInfo.resSchema.parse(res.data);
    } catch (e) {
      // TODO: Manuall error handling as seen in https://github.com/poviolabs/nextjs-template/blob/main/src/util/rest/clients/rest-client.ts#L106-L108
      throw e;
    }
  }
}
