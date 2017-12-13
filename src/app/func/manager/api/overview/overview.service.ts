import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../../app.service';
import { QueryAPI, QueryParam } from './model';

@Injectable()
export class OverviewService {
  constructor(private appService: AppService) {}

  /**
   * 获取接口概览 - API用户
   *
   * @param {QueryParam} param
   * @returns {Observable<any>}
   * @memberof OverviewService
   */
  public getApiOverview(param: QueryParam): Observable<any> {
    const method = 'common/getApiOverview';
    const { page: pageNum, key: apiName, cat: apiCategory, sort: createTimeSort } = param;
    return this.appService.GET(method, { pageNum, apiName, apiCategory, createTimeSort });
  }

  /**
   * 获取接口概览 - Admin
   *
   * @param {QueryParam} param
   * @returns {Observable<any>}
   * @memberof OverviewService
   */
  public adminGetApiOverview(param: QueryParam): Observable<any> {
    const method = 'admin/api/getApiOverview';
    const { page: pageNum, key: apiName, cat: apiCategory, sort: createTimeSort } = param;
    return this.appService.GET(method, { pageNum, apiName, apiCategory, createTimeSort });
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

  public updateApiInfo(param): Observable<any> {
    const method = 'admin/api/updateApiInfo';
    return this.appService.PUT(method, param);
  }
}
