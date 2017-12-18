import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../../app.service';
import { APIDetail } from './api-detail.model';

@Injectable()
export class OverviewDetailService {
  constructor(private appService: AppService) {}

  /**
   * 获取接口详情 - API用户
   *
   * @param {string} apiId
   * @returns {Observable<any>}
   * @memberof OverviewDetailService
   */
  public getApiInfo(apiId: string): Observable<any> {
    const method = 'common/getApiInfo';
    return this.appService.GET(method, { apiId });
  }

  /**
   * 更新接口详情
   *
   * @param {number} apiId
   * @param {APIDetail} p
   * @returns {Observable<any>}
   * @memberof OverviewDetailService
   */
  public updateApiInfo(apiId: number, p: APIDetail): Observable<any> {
    const method = 'admin/api/updateApiInfo';
    const { accessUrl, queryType, returnType, accessSample, returnSample, errorCodeList, header, body, query } = p;
    const paramList = Object.assign({}, header, body, query);
    return this.appService.PUT(
      method,
      Object.assign(
        {},
        { apiId },
        { accessUrl, queryType, returnType, accessSample, returnSample, errorCodeList, paramList }
      )
    );
  }
}
