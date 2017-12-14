import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../../app.service';
import { QueryParam } from './model';

@Injectable()
export class ApiRecordService {
  constructor(private appService: AppService) {}

  /**
   * 管理员 获取API调用记录
   *
   * @param {QueryParam} p
   * @returns {Observable<any>}
   * @memberof ApiRecordService
   */
  public adminGetCountAsscssApi(p: QueryParam): Observable<any> {
    const method = 'admin/api/getCountAsscssApi';
    const { page: pageNum, uid, apiName, url, startDate, endDate } = p;
    return this.appService.GET(method, { pageNum, uid, apiName, url, startDate, endDate });
  }

  /**
   * API用户 获取API调用记录
   *
   * @param {number} pageNum
   * @param {number} id 用户id
   * @returns {Observable<any>}
   * @memberof ApiRecordService
   */
  public getCountAsscssApi(pageNum: number, id: number): Observable<any> {
    const method = 'common/getCountAsscssApi';
    return this.appService.GET(method, { pageNum, id });
  }
}
