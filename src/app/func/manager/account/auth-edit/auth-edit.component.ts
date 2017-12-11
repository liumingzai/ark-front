import { Component, OnInit, AfterViewInit } from '@angular/core';
import { flyInOutAnimation } from '../../../../tool/animation/fly-in-out.animation';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import { AuthService } from '../auth/service/auth.service';
import { AppService } from '../../../../app.service';

import { SnackBar } from '../../../../tool/snackbar';

import * as _ from 'lodash';
import { Auth } from '../auth/model/auth';

@Component({
  templateUrl: './auth-edit.component.html',
  animations: [flyInOutAnimation],
  providers: [AuthService]
})
export class AuthEditComponent implements OnInit, AfterViewInit {
  private scopes: string[];
  private filters: string[];
  private id: number;
  private showTitle: string;
  private auth: Auth;
  private isSubmiting: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private appService: AppService,
    private snackbar: SnackBar
  ) {
    this.id = this.route.snapshot.queryParams['id'];
    this.showTitle = this.id ? '编辑权限' : '新增权限';
    this.auth = new Auth();
  }
  public ngOnInit() {
    this.getScope();
    this.getFilter();
  }

  public ngAfterViewInit() {
    if (this.id) {
      this.getPermissionById(this.id);
    }
  }

  /**
   * click 保存 btn
   *
   * @memberof CaseEditComponent
   */
  public onSubmit() {
    if (!this.isSubmiting) {
      this.isSubmiting = true;
    } else {
      return;
    }
    this.onSubmitVerify();
  }

  /**
   * 返回上一级
   */
  private goBack() {
    _.delay(() => {
      this.router.navigate(['/manager/account/auth'], {
        relativeTo: this.route
      });
    }, 1000);
  }

  /**
   * 根据用户ID获取要修改的用户
   *
   * @private
   * @param {number} md5
   * @memberof UserEditComponent
   */
  private getPermissionById(id: number) {
    this.authService.getPermissionById(id).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.auth = data.data;
      }
    });
  }

  /**
   * 提交保存
   *
   * @private
   * @memberof CaseEditComponent
   */
  private onSubmitVerify() {
    swal({
      title: '您确定要保存吗？',
      text: '一旦保存，信息将发布到平台!',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#0069d9',
      cancelButtonColor: '#868e96',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(
      () => {
        // swal('Deleted!', 'Your file has been deleted.', 'success');
        this.id ? this.updateAuth() : this.addAuth();
      },
      (dismiss: string) => {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
          // swal('Cancelled', 'Your imaginary file is safe :)', 'error');
          this.isSubmiting = false;
          this.snackbar.info('已取消保存');
        }
      }
    );
  }

  /**
   * 新增权限
   *
   * @private
   * @memberof UserEditComponent
   */
  private addAuth(): void {
    this.authService.AddPermission(this.auth).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackbar.success('正在跳转到列表页', '新增成功');
        this.goBack();
      }
      this.isSubmiting = false;
    });
  }

  /**
   * 修改权限
   *
   * @private
   * @memberof UserEditComponent
   */
  private updateAuth(): void {
    this.authService.updatePermission(this.auth).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackbar.success('修改成功');
        this.goBack();
      }
      this.isSubmiting = false;
    });
  }

  /**
   * 获取作用域信息
   */
  private getScope() {
    this.authService.getPermissionScope().subscribe((data: any) => {
      if (data && '2000' === data.code) {
        this.scopes = data.data;
      }
    });
  }

  /**
   * 获取过滤器信息
   */
  private getFilter() {
    this.authService.getPermissionFilters().subscribe((data: any) => {
      if (data && '2000' === data.code) {
        this.filters = data.data;
      }
    });
  }
}
