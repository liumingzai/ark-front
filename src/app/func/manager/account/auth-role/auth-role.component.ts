import { Component, OnInit } from '@angular/core';
import { flyInOutAnimation } from '../../../../tool/animation/fly-in-out.animation';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import { AuthRoleService } from './auth-role.service';
import { AppService } from '../../../../app.service';

import { SnackBar } from '../../../../tool/snackbar';

import * as _ from 'lodash';
import { Role } from '../role/model/role';
import { debug } from 'util';

@Component({
  templateUrl: './auth-role.component.html',
  animations: [flyInOutAnimation],
  providers: [AuthRoleService]
})
export class AuthRoleComponent implements OnInit {
  private roleId: number;
  private binds: string[];
  private unbinds: string[];
  private bindTotal: number = 0;
  private unbindTotal: number = 0;
  private bindCurPage: number = 1;
  private unbindCurPage: number = 1;

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private authRoleService: AuthRoleService,
    private appService: AppService,
    private snackbar: SnackBar
  ) {
    this.roleId = this.activedRoute.snapshot.queryParams['id'];
  }

  public ngOnInit() {
    this.getBindAuthDatas(1);
    this.getUnBindAuthDatas(1);
  }

  // 已绑定的权限列表翻页
  public paginate_bind(paginator: any) {
    this.bindCurPage = paginator.page + 1;
    this.getBindAuthDatas(this.bindCurPage);
  }

  // 未绑定的权限列表翻页
  public paginate_unbind(paginator: any) {
    this.unbindCurPage = paginator.page + 1;
    this.getUnBindAuthDatas(this.unbindCurPage);
  }

  /**
   * 绑定权限
   */
  public onBind(obj: any) {
    const permissions = new Array<{ id: number }>();
    permissions.push(obj);
    this.authRoleService.addRolePermissions(this.roleId, permissions).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackbar.info(data.message);
        this.getBindAuthDatas(1);
        this.getUnBindAuthDatas(1);
      }
    });
  }

  /**
   * 解除绑定
   */
  public onUnBind(obj: any) {
    const permissions = new Array<{ id: number }>();
    permissions.push(obj);
    this.authRoleService.deleteRolePermissions(this.roleId, permissions).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackbar.info(data.message);
        this.getBindAuthDatas(1);
        this.getUnBindAuthDatas(1);
      }
    });
  }

  /**
   * 获取已绑定的权限列表
   * @param page
   */
  private getBindAuthDatas(page: number) {
    this.authRoleService.getBindPermissionListById(this.roleId, page).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.binds = data.data;
        this.bindTotal = data.size;
      }
    });
  }

  /**
   * 获取未绑定的权限列表
   * @param page
   */
  private getUnBindAuthDatas(page: number) {
    this.authRoleService.getUnBindPermissionListById(this.roleId, page).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.unbinds = data.data;
        this.unbindTotal = data.size;
      }
    });
  }
}
