import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AppService } from '../../../app.service';

@Injectable()
export class UserServer {
  constructor(private Server: AppService) { }
  // sertype:请求类型 rooturl：请求路径 data：传入类json数据
  public FnUsers(sertype: string, rooturl: string, data?: any, isForm?: boolean) {
    const option = data ? {
      id: data.id, // 用户的id
      uid: data.uid, // 用户的uid
      name: data.name, // 角色名称
      path: data.path, // 路径
      roles: data.roles, // 用户添加角色Id集合
      phone: data.phone, // 手机号
      email: data.email, // 邮箱
      state: data.state, // 用户状态 -------:0禁用，1:启用 。----------默认查全部
      active: data.active, // 有效标识 ---Y：有效 N：无效
      roleId: data.roleId, // 角色ID
      pageNum: data.pageNum, // 页数。--------默认为1
      username: data.username, // 查询的用户名
      userToken: data.userToken, // userToken
      accountId: data.accountId, // 用户id
      wlContent: data.wlContent, // "白名单最多数量",
      wlMaxCount: data.wlMaxCount, // 默认为0，--------默认按照用户创建时间倒序排列。
      description: data.description, // 应用描述
      applicationId: data.applicationId, // 应用id，
      appMd5: data.appMd5, // 场景id，
      createtimeSort: data.createtimeSort, // 创建时间
      createTimeSort: data.createtimeSort, // 默认为0，--------默认按照用户创建时间倒序排列。
      applicationName: data.applicationName, // 应用名称
      filters: data.filters, // 过滤器
      permissionScope: data.permissionScope, // 作用域
      displayName: data.displayName, // 显示名称
      permissionName: data.permissionName, // 权限名称
      permissions: data.permissions,
      accessUrl: data.accessUrl,
      queryType: data.queryType,
      returnType: data.returnType,
      returnSample: data.returnSample,
      errorCodeList: data.errorCodeList,
      paramList: data.paramList,
      apiId: data.apiId, // 接口ID
    } : null;
    const Froms = isForm ? { isFormSubmit: true} : null;
    return this.Server[sertype](rooturl, option, Froms);
  }
}
