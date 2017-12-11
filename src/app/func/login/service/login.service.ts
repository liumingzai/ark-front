import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AppService } from '../../../app.service';

@Injectable()
export class LoginService {
  constructor(private appService: AppService) {}
  // sertype:请求类型 rooturl：请求路径 data：传入类json数据
  public FnHomes(sertype: string, rooturl: string, data?: any, isForm?: boolean) {
    const option = data
      ? {
          authentication: data.authentication, // 用户名
          phone: data.phone, // 注册手机号
          email: data.email, // 注册邮箱
          password: data.password, // 密码
          verifyCode: data.verifyCode, // 验证码
          geeServerStatus: data.geeServerStatus, // 验证状态
          verifyType: data.verifyType, // 验证类型
          authCode: data.authCode // 登录验证码
        }
      : null;
    const Froms = isForm ? { isFormSubmit: true } : null;
    return this.appService[sertype](rooturl, option, Froms);
  }
}
