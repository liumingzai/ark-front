import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../app.service';

@Injectable()
export class UserHttpServer {
  constructor(private appService: AppService) {}
  // sertype:请求类型 rooturl：请求路径 data：传入类json数据
  public FnUsers(sertype: string, rooturl: string, data?: any): Observable<any> {
    const option = data ? {} : null;
    return this.appService[sertype](rooturl, option);
  }
}
