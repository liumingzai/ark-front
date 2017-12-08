import { Component, OnInit, AfterViewInit } from '@angular/core';
import { flyInOutAnimation } from '../../../../tool/animation/fly-in-out.animation';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import swal from 'sweetalert2';

import { UserService } from '../user/service/user.service';
import { RoleService } from '../role/service/role.service';
import { AppService } from '../../../../app.service';

import { SnackBar } from '../../../../tool/snackbar';

import * as _ from 'lodash';
import { BindRoleComponent } from './bind-role/bind-role.component';
import { User } from '../user/model/user.model';
import { Role } from '../role/model/index';

@Component({
  templateUrl: './user-edit.component.html',
  animations: [ flyInOutAnimation ],
  styleUrls: ['./user-edit.component.scss'],
  providers: [UserService, RoleService]
})
export class UserEditComponent implements OnInit, AfterViewInit {
  public user: User;
  public dialogShow: boolean = false;
  private isSubmiting: boolean = false; // 等待服务器返回结果, true means res success, can do next action.
  private id: number;
  private showTitle: string;

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private roleService: RoleService,
    private appService: AppService,
    private snackbar: SnackBar,
  ) {
    this.user = new User();
  }

  public ngOnInit() {
    this.id = this.activedRoute.snapshot.queryParams['id'] || 0;
    this.showTitle = this.id ? '编辑用户' : '新增用户';
  }

  public ngAfterViewInit() {
    if (this.id) {
      this.getAccountDetail(this.id);
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
      this.router.navigate(['/manager/account/user'], {
        relativeTo: this.activedRoute,
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
  private getAccountDetail(id: number) {
    this.userService.getAccountById(id).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.user = data.data;
      }
    });
  }

  /**
   * 绑定角色
   *
   * @memberof EditComponent
   */
  private openBindRoleDialog() {
    const dialogRef = this.dialog.open(BindRoleComponent, {
      width: '800px',
      height: '400px',
      data: {
        roles: this.user.roles
      }
    });

    dialogRef.afterClosed().subscribe((result: { roles: Role[] }) => {
      if (result) {
        this.user.roles = result.roles;
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
        this.id ? this.updateUser() : this.addUser();
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
   * 新增用户
   *
   * @private
   * @memberof UserEditComponent
   */
  private addUser(): void {
    this.userService.AddAccount(this.user).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackbar.success('正在跳转到列表页', '新增成功');
        this.goBack();
      }
      this.isSubmiting = false;
    });
  }

  /**
   * 修改用户
   *
   * @private
   * @memberof UserEditComponent
   */
  private updateUser(): void {
    this.userService.updateAccount(this.user).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackbar.success('修改成功');
        this.goBack();
      }
      this.isSubmiting = false;
    });
  }

}
