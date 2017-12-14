import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../../app.service';
import { Scene } from './model';

@Injectable()
export class SceneService {
  constructor(private appService: AppService) {}

  public getAppWhiteList(accountId: number): Observable<any> {
    const method = 'common/getAppWhiteList';
    return this.appService.GET(method, { accountId });
  }

  /**
   * 更新场景 - admin用户
   *
   * @param {Scene} p
   * @returns {Observable<any>}
   * @memberof SceneService
   */
  public adminUpdateAppWhiteList(p: Scene): Observable<any> {
    const method = 'admin/um/updateAppWhiteList';
    return this.appService.PUT(method, p);
  }

  /**
   * 更新场景 - API用户
   *
   * @param {Scene} p
   * @returns {Observable<any>}
   * @memberof SceneService
   */
  public updateAppWhiteList(p: Scene): Observable<any> {
    const method = 'common/updateAppWhiteList';
    return this.appService.PUT(method, p);
  }

  /**
   * 新增场景 - API用户
   *
   * @param {Scene} p
   * @returns {Observable<any>}
   * @memberof SceneService
   */
  public addAppWhiteList(p: Scene): Observable<any> {
    const method = 'common/addAppWhiteList';
    return this.appService.POST(method, p);
  }

  /**
   * 新增场景 - Admin
   *
   * @param {Scene} p
   * @returns {Observable<any>}
   * @memberof SceneService
   */
  public adminAddAppWhiteList(p: Scene): Observable<any> {
    const method = 'admin/um/addAppWhiteList';
    return this.appService.POST(method, p);
  }

  /**
   * 删除场景
   *
   * @param {string} appMd5
   * @param {number} accountId 用户ID
   * @returns {Observable<any>}
   * @memberof SceneService
   */
  public deleteAppWhiteList(appMd5: string, accountId: number): Observable<any> {
    const method = 'common/deleteAppWhiteList';
    return this.appService.DELETE(method, { appMd5, accountId });
  }

  /**
   * 用户初始场景最大数量
   *
   * @returns {Observable<any>}
   * @memberof SceneService
   */
  public getAppMaxCount(): Observable<any> {
    const method = 'admin/um/getAppMaxCount';
    return this.appService.GET(method);
  }
}
