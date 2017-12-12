import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Account } from './account.model';
import * as $ from 'jquery';

@Injectable()
export class AppService {
  public readonly isProd: boolean = false; // OR true
  public readonly base: string = this.isProd ? '' : 'http://192.168.1.151';
  private readonly host: string = window.location.protocol + '//' + window.location.host;
  public readonly baseURL: string = `${this.base}/api-portal`;
  // public readonly imgPathPre: string = `${this.base || this.host}/images`; // 暂时无用

  constructor(private http?: HttpClient) {}

  private accountSource = new Subject<Account>();
  public accountAnnounced = this.accountSource.asObservable();

  /**
   * Service message commands
   *
   * @param {Account} account
   * @memberof AppService
   */
  public announceAccount(account: Account) {
    localStorage.setItem('account', JSON.stringify(account));
    this.accountSource.next(account);
  }

  /**
   * 生成请求的URL, 自动去掉value为null和undefined的参数
   * 目前主要用于 GET 请求
   *
   * @param {string} method
   * @param {object} params
   * @returns {string}
   * @memberof AppService
   */
  private resolveParamUrl(method: string, params?: object): string {
    if (!/^\//.test(method)) {
      method = `/${method}`;
    }
    let url = `${this.baseURL}${method}`;
    if (params) {
      Object.keys(params).forEach(key => {
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

    return url;
  }

  /**
   * 通用获取JSONAPI
   * path 一定是以 /asset/localdb 为开始的路径!
   * @param {string} path
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public GetJSON(path: string): Observable<any> {
    const url = this.isProd ? path : `/src${path}`;
    return this.http.get(url);
  }

  /**
   * 通用GET请求
   * method is like: '/admin/add'
   * param is like: { key: 'test'}
   *
   * @param {string} method
   * @param {object} param
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public GET(method: string, param?: object): Observable<any> {
    return this.http.get(this.resolveParamUrl(method, param));
  }

  /**
   * 通用DELETE请求
   * method is like: '/admin/add'
   * param is like: { key: 'test'}
   */

  public DELETE(method: string, param?: object): Observable<any> {
    return this.http.delete(this.resolveParamUrl(method, param));
  }

  /**
   * 通用POST请求
   * method is like: '/admin/add'
   * body is like: {key: 'test'}
   *
   * @param {string} method
   * @param {object} body
   * @param {{ isFormSubmit?: boolean }} [options]
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public POST(method: string, body: object, options?: { isFormSubmit?: boolean }): Observable<any> {
    return this.commonMethod('post', method, body, options);
  }

  /**
   * PUT
   *
   * @param {string} method
   * @param {object} body
   * @param {{ isFormSubmit?: boolean }} [options]
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public PUT(method: string, body: object, options?: { isFormSubmit?: boolean }): Observable<any> {
    return this.commonMethod('put', method, body, options);
  }

  /**
   * PATCH
   *
   * @param {string} method
   * @param {object} body
   * @param {{ isFormSubmit?: boolean }} [options]
   * @returns {Observable<any>}
   * @memberof AppService
   */
  public PATCH(method: string, body: object, options?: { isFormSubmit?: boolean }): Observable<any> {
    return this.commonMethod('patch', method, body, options);
  }

  private commonMethod(
    httpMethod: 'post' | 'put' | 'patch',
    method: string,
    body: object,
    options?: { isFormSubmit?: boolean }
  ): Observable<any> {
    if (!/^\//.test(method)) {
      method = `/${method}`;
    }
    // 请求URL
    const url = `${this.baseURL}${method}`;

    // 从请求体中删除掉value为null,undefined的key
    Object.keys(body).forEach((key: string) => {
      if (body[key] === null || body[key] === undefined || body[key] === 'null' || body[key] === 'undefined') {
        delete body[key];
      }
    });

    // 区别 formPOST & commonPOST
    if (options && options.isFormSubmit && options.isFormSubmit === true) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      return this.http[httpMethod](url, $.param(body), {
        headers,
        withCredentials: true
      });
    } else {
      return this.http[httpMethod](url, body, {
        withCredentials: true
      });
    }
  }
}
