import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../../app.service';

@Injectable()
export class OverviewService {
  constructor(private appService: AppService) {}

  /**
   * 获取接口概览 - API用户
   *
   * @returns {Observable<any>}
   * @memberof OverviewService
   */
  public getApiOverview(): Observable<any> {
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
}
