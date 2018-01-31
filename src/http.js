import axios from 'axios';
import { message } from 'antd';
import queryString from 'query-string';

/**
 * Common http service defination
 *
 * @class Http
 */
class Http {
  constructor() {
    this.baseURL = 'http://192.168.1.151/ark-portal';
    // this.baseURL = '/proxy/api-portal';
    this.imgPathPre = 'http://192.168.1.145/dc/';

    this.axios = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // request interceptors
    this.axios.interceptors.request.use(config => config, error => Promise.reject(error));

    // res interceptors
    this.axios.interceptors.response.use(
      (res) => {
        if (res.status === 200) {
          if (res.data.code === '2001') {
            // no login
            localStorage.removeItem('account');
            window.location.href = '/login';
            // 在需要登录授权的页面，应该跳转到首页或者登录页面
          } else if (res.data.code === '2002') {
            // no auth
            console.warn('您没有操作权限');
            message.warning('您没有操作权限');
            // redirect to homepage
          } else if (res.data.code === '4004') {
            // error
            console.error(res.data.message, res.data.code);
            message.error(res.data.message);
          } else if (/[2|3|4][\d]{3}/.test(res.data.code) && !/2000/.test(res.data.code)) {
            // other errors
            console.error(res.data.message, res.data.code);
            message.error(res.data.message);
          }
        } else if (/^5\d{2}/.test(res.status)) {
          console.error('Server error');
          console.error(res.data);
          message.error('Server error');
        } else if (/^4\d{2}/.test(res.status)) {
          console.warn('Something error, please admin do check!');
          console.error(res.data);
        }

        return res.data;
      },
      error => Promise.reject(error),
    );
  }

  /**
   * Resolve GET,DELETE url
   *
   * @param {any} method
   * @param {any} params
   * @returns
   * @memberof Http
   */
  resolveURL(method, params) {
    if (!/^\//.test(method)) {
      method = `/${method}`;
    }

    let url = `${this.baseURL}${method}`;

    if (params) {
      if (params) {
        Object.keys(params).forEach((key) => {
          if (
            params[key] !== null &&
            params[key] !== undefined &&
            params[key] !== 'null' &&
            params[key] !== 'undefined'
          ) {
            url += `${/\?/.test(url) === false ? '?' : '&'}${key}=${params[key]}`;
          }
        });
      }
    }
    return url;
  }

  /**
   * API - GET
   *
   * @param {any} method
   * @param {any} params
   * @returns
   * @memberof Http
   */
  GET(method, params) {
    return this.axios.get(this.resolveURL(method, params));
  }

  /**
   * API - DELETE
   *
   * @param {any} method
   * @param {any} params
   * @returns
   * @memberof Http
   */
  DELETE(method, params) {
    return this.axios.delete(this.resolveURL(method, params));
  }

  /**
   * POST,PUT,PATCH resolve request data
   *
   * @param {any} method
   * @param {any} data
   * @param {any} options
   * @returns
   * @memberof Http
   */
  resolveRequest(method, data, options) {
    const config = {};

    if (!/^\//.test(method)) {
      method = `/${method}`;
    }
    // 请求URL
    const url = `${this.baseURL}${method}`;

    // 从请求体中删除掉value为null,undefined的key
    Object.keys(data).forEach((key) => {
      if (
        data[key] === null ||
        data[key] === undefined ||
        data[key] === 'null' ||
        data[key] === 'undefined'
      ) {
        delete data[key];
      }
    });

    if (options && options.isFormData) {
      data = queryString.stringify(data);
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    }

    return { url, data, config };
  }

  /**
   * API - POST
   *
   * @param {any} method
   * @param {any} reqData
   * @param {any} options
   * @returns
   * @memberof Http
   */
  POST(method, reqData, options) {
    const { url, data, config } = this.resolveRequest(method, reqData, options);
    return this.axios.post(url, data, config);
  }

  /**
   * API - PUT
   *
   * @param {any} method
   * @param {any} reqData
   * @returns
   * @memberof Http
   */
  PUT(method, reqData) {
    const { url, data } = this.resolveRequest(method, reqData);
    return this.axios.put(url, data);
  }

  /**
   * API - PATCH
   *
   * @param {any} method
   * @param {any} reqData
   * @returns
   * @memberof Http
   */
  PATCH(method, reqData) {
    const { url, data } = this.resolveRequest(method, reqData);
    return this.axios.post(url, data);
  }
}

export default Http;
