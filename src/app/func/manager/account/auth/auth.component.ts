import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, Params } from '@angular/router';

import swal from 'sweetalert2';
import { AuthService } from './service/auth.service';
import { QueryParam } from './model';
import { SnackBar } from '../../../../tool/snackbar';
import { flyInOutAnimation } from '../../../../tool/animation';

@Component({
  templateUrl: './auth.component.html',
  animations: [flyInOutAnimation],
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {
  public totalRecords: number = 0;
  public currentPage: number = 1;
  public auths: any[];
  public queryParam: QueryParam;
  private key: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private snackbar: SnackBar
  ) {
    this.queryParam = new QueryParam();
  }

  public ngOnInit() {
    this.activedRoute.queryParams.subscribe((params: Params) => {
      this.queryParam.pageNum = Number(params['pageNum']) || 1;
      this.key = params['key'] || null;
      this.queryParam.createTimeSort = Number(params['sort']) || 0;
      this.queryParam.active = params['active'] || null;
      this.queryParam.stype = params['stype'] || 'name';
      if (this.queryParam.stype === 'name') {
        this.queryParam.permissionName = this.key;
        this.queryParam.path = null;
      } else {
        this.queryParam.permissionName = null;
        this.queryParam.path = this.key;
      }
      this.currentPage = this.queryParam.pageNum;
      this.getPermissionList();
    });
  }

  /**
   * 翻页
   * @param paginator
   */
  public paginate(paginator: any) {
    const pageNum = paginator.page + 1;
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        pageNum
      }
    };
    this.router.navigate([], navigationExtras);
  }

  /**
   * 按照创建时间排序
   */
  public onChangeSort() {
    const createTimeSort = this.queryParam.createTimeSort === 0 ? 1 : 0;
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        createTimeSort
      }
    };

    this.router.navigate([], navigationExtras);
  }

  /**
   * 过滤权限状态
   * @param type
   */
  public onChangeActive(active: number) {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        pageNum: 1,
        active
      }
    };

    this.router.navigate([], navigationExtras);
  }

  /**
   * 检测搜索类型变化
   * @param stype
   */
  public onChangeSearchType(stype: string): void {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        stype
      }
    };
    this.router.navigate([], navigationExtras);
  }

  /**
   * 按照关键字查询
   * @param key
   */
  public onSearch(key: string) {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        page: 1,
        key
      }
    };

    this.router.navigate([], navigationExtras);
  }

  /**
   * 删除用户
   * @param uid
   */
  public onDelete(id: number) {
    swal({
      title: '您确定要删除吗？',
      text: '该操作将彻底删除，并且不能恢复!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0069d9',
      cancelButtonColor: '#868e96',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(
      () => {
        this.deletePermission(id);
      },
      (dismiss: string) => {
        if (dismiss === 'cancel') {
          // do antion cancel
        }
      }
    );
  }

  /**
   * 获取角色列表
   * @private
   * @param {QueryParam} queryParam
   * @memberof RoleComponent
   */
  private getPermissionList() {
    this.authService.getPermissionList(this.queryParam).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.auths = data.data;
        this.totalRecords = data.size;
      }
    });
  }

  /**
   * 删除角色
   *
   * @private
   * @param {number} id
   * @memberof RoleComponent
   */
  private deletePermission(id: number) {
    this.authService.deletePermission(id).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackbar.success('删除用户成功');
        this.getPermissionList();
      }
    });
  }
}
