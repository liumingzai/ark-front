import { Injectable } from '@angular/core';
import { AppService } from '../../../../../app.service';
import { Observable } from 'rxjs/Observable';

import { Role, QueryParam } from '../model';

@Injectable()
export class RoleService {
  constructor(private appService: AppService) {}

  /**
   * 管理员(admin)-权限管理(pm)-获取角色列表
   *
   * @param {QueryParam} queryParam
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public getRoleList(queryParam: QueryParam): Observable<any> {
    const method = '/admin/pm/getRole';
    return this.appService.GET(method, queryParam);
  }

  /**
   * 获取角色名称列表-用于绑定角色使用
   */
  public getAllRole(): Observable<any> {
    const method = '/admin/pm/getAllRole';
    return this.appService.GET(method);
  }

  /**
   * 添加角色
   *
   * @param {Account} account
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public AddRole(role: Role): Observable<any> {
    const method = '/admin/pm/addRole';
    return this.appService.POST(method, role);
  }

  /**
   * 更新角色
   *
   * @param {Account} account
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public updateRole(role: Role): Observable<any> {
    const method = '/admin/pm/updateRole';
    return this.appService.PUT(method, role);
  }

  /**
   * 删除角色根据角色ID
   *
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public deleteRole(id: number): Observable<any> {
    const method = '/admin/pm/deleteRole';
    return this.appService.DELETE(method, {
      id
    });
  }

  /**
   * 获取指定ID的角色-用于角色编辑
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public getRoleById(id: number): Observable<any> {
    const method = '/admin/pm/getRoleById';
    return this.appService.GET(method, { id });
  }
}
