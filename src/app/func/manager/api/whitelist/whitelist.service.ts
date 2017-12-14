import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../../app.service';
import { QueryParam } from './model';

@Injectable()
export class WhitelistService {
  constructor(private appService: AppService) {}

  /**
   * 	管理员-白名单访问统计记录
   *
   * @param {QueryParam} p
   * @returns {Observable<any>}
   * @memberof WhitelistService
   */
  public getSummaryWhiteListLog(p: QueryParam): Observable<any> {
    const method = '/admin/api/getSummaryWhiteListLog';
    const { page: pageNum, uid, apiId, clientIp, url, dailyDate } = p;

    return this.appService.GET(method, { pageNum, uid, apiId, clientIp, url, dailyDate });
  }
}
