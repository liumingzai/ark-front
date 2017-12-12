import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../../app.service';
import { API, QueryAPI } from './model';

@Injectable()
export class OverviewService {
  constructor(private appService: AppService) {}

  /**
   * 获取接口概览 - API用户
   *
   * @param {QueryAPI} param
   * @returns {Observable<any>}
   * @memberof OverviewService
   */
  public getApiOverview(param: QueryAPI): Observable<any> {
    const method = 'common/getApiOverview';
    return this.appService.GET(method);
  }

  /**
   * 获取接口详情 - API用户
   *
   * @param {string} apiId
   * @returns {Observable<any>}
   * @memberof OverviewService
   */
  public getApiInfo(apiId: string): Observable<any> {
    const method = 'common/getApiInfo';
    return this.appService.GET(method, { apiId });
  }

  /**
   * 获取接口概览 - Admin
   *
   * @param {QueryAPI} param
   * @returns {Observable<any>}
   * @memberof OverviewService
   */
  public adminGetApiOverview(param: QueryAPI): Observable<any> {
    const method = 'admin/api/getApiOverview';
    return this.appService.GET(method, param);
  }

  /**
   * 删除API - admin用户
   *
   * @param {string} apiId
   * @returns {Observable<any>}
   * @memberof OverviewService
   */
  public deleteApi(apiId: string): Observable<any> {
    const method = 'admin/api/deleteApi';
    return this.appService.DELETE(method, { apiId });
  }

  /**
   * 新增API - 管理员
   *
   * @param {API} body
   * @returns {Observable<any>}
   * @memberof OverviewService
   */
  public addApiOverview(body: API): Observable<any> {
    const method = 'admin/api/addApiOverview';
    return this.appService.POST(method, body);
  }

  /**
   * 修改API - 管理员
   *
   * @param {API} body
   * @returns {Observable<any>}
   * @memberof OverviewService
   */
  public updateApiOverview(body: API): Observable<any> {
    const method = 'admin/api/updateApiOverview';
    return this.appService.PUT(method, body);
  }

  public updateApiInfo(param): Observable<any> {
    const method = 'admin/api/updateApiInfo';
    return this.appService.PUT(method, param);
  }
}
