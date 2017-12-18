import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../../app.service';
import { API } from './api.model';

@Injectable()
export class OverviewEditService {
  constructor(private appService: AppService) {}

  /**
   * 新增API - 管理员
   *
   * @param {API} body
   * @returns {Observable<any>}
   * @memberof OverviewEditService
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
   * @memberof OverviewEditService
   */
  public updateApiOverview(body: API): Observable<any> {
    const method = 'admin/api/updateApiOverview';
    return this.appService.PUT(method, body);
  }

  /**
   * 获取API概览详情
   *
   * @param {number} apiId
   * @returns
   * @memberof OverviewEditService
   */
  public getApiOverView(apiId: number) {
    const method = 'common/getApiOverviewById';
    return this.appService.GET(method, { apiId });
  }
}
