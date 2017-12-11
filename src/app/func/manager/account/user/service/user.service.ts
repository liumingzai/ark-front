import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { AppService } from '../../../../../app.service';
import { Observable } from 'rxjs/Observable';

import { QueryParam, User } from '../model';

@Injectable()
export class UserService {
  // 请求头定义
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private appService: AppService) {}

  /**
   * 管理员(admin)-用户管理(um)-获取用户列表
   *
   * @param {QueryParam} queryParam
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public getAccountList(queryParam: QueryParam): Observable<any> {
    const method = '/admin/um/getAccountList';
    return this.appService.GET(method, queryParam);
  }

  /**
   * 添加用户
   *
   * @param {Account} account
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public AddAccount(user: User): Observable<any> {
    const method = '/admin/um/addAccount';
    return this.appService.POST(method, user);
  }

  /**
   * 更新用户
   *
   * @param {Account} account
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public updateAccount(user: User): Observable<any> {
    const method = '/admin/um/updateAccount';
    return this.appService.PUT(method, user);
  }

  /**
   * 删除用户根据用户ID
   *
   * @param {number} number
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public deleteAccount(id: number): Observable<any> {
    const method = '/admin/um/deleteAccount';
    return this.appService.DELETE(method, { id });
  }

  /**
   * 更改账户状态
   *
   * @param {number} id
   * @param {number} state
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public updataAccountState(id: number, state: number) {
    const method = '/admin/um/updateAccountState';
    return this.appService.POST(method, { id, state });
  }

  /**
   * 获取用户详情-用于编辑用户
   * @param id
   */
  public getAccountById(accountId: number) {
    const method = '/admin/um/getAccountById';
    return this.appService.GET(method, { accountId });
  }
}
