import { Injectable } from '@angular/core';
import { AppService } from '../../../../../app.service';
import { Observable } from 'rxjs/Observable';

import { Auth, QueryParam } from '../model';


@Injectable()
export class AuthService {
  constructor(private appService: AppService) {}

  /**
   * 管理员(admin)-权限管理(pm)-获取权限列表
   *
   * @param {QueryParam} queryParam
   * @returns {Observable<any>}
   * @memberof AuthService
   */
  public getPermissionList(queryParam: QueryParam): Observable < any > {
    const method = '/admin/pm/getPermissions';
    return this.appService.GET(method, queryParam);
  }

  /**
   * 添加权限
   *
   * @param {Account} account
   * @returns {Observable<any>}
   * @memberof AuthService
   */
  public AddPermission(auth: Auth): Observable < any > {
    const method = '/admin/pm/addPermissions';
    return this.appService.POST(method, auth);
  }

  /**
   * 更新角色
   *
   * @param {Account} account
   * @returns {Observable<any>}
   * @memberof AuthService
   */
  public updatePermission(auth: Auth): Observable < any > {
    const method = '/admin/pm/updatePermissions';
    return this.appService.PUT(method, auth);
  }

  /**
   * 删除权限据权限ID
   *
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof AuthService
   */
  public deletePermission(id: number): Observable < any > {
    const method = '/admin/pm/deletePermissions';
    return this.appService.DELETE(method, {
      id
    });
  }


  /**
   * 获取作用域信息
   */
  public getPermissionScope(): Observable < any > {
    const method = '/admin/pm/getPermissionScope';
    return this.appService.GET(method);
  }

  /**
   * 获取过滤器信息
   */
  public getPermissionFilters(): Observable < any > {
    const method = '/admin/pm/getPermissionFilters';
    return this.appService.GET(method);
  }

  /**
   * 获取指定ID的权限信息-用于权限编辑
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof AuthService
   */
  public getPermissionById(id: number): Observable < any > {
    const method = '/admin/pm/getPermissionsById';
    return this.appService.GET(method, { id });
  }

}

