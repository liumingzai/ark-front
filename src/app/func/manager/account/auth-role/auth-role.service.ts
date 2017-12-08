import { Injectable } from '@angular/core';
import { AppService } from '../../../../app.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthRoleService {
  constructor(private appService: AppService) {}


  /**
   * 获取绑定权限列表
   * @param {number} id
   * @param {number} pageNum
   * @returns {Observable<any>}
   * @memberof AuthRoleService
   */
  public getBindPermissionListById(id: number, pageNum: number): Observable < any > {
    const method = '/admin/pm/getRoleBindPermissions';
    return this.appService.GET(method, { id, pageNum });
  }

  /**
   * 获取未绑定权限列表
   * @param {number} id
   * @param {number} pageNum
   * @returns {Observable<any>}
   * @memberof AuthRoleService
   */
  public getUnBindPermissionListById(id: number, pageNum: number): Observable < any > {
    const method = '/admin/pm/getRoleUnbindPermissions';
    return this.appService.GET(method, { id, pageNum });
  }

  /**
   * 添加绑定
   * @param id
   * @param permission
   */
  public addRolePermissions(id: number, permissions: Array<{id: number}>): Observable < any >  {
    const method = '/admin/pm/addRolePermissions';
    return this.appService.POST(method, {id, permissions});
  }

  /**
   * 解除绑定
   * @param id
   * @param permission
   */
  public deleteRolePermissions(id: number, permissions: Array<{id: number}>): Observable < any >  {
    const method = '/admin/pm/deleteRolePermissions';
    return this.appService.POST(method, {id, permissions});
  }

}

