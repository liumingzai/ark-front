import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, Params } from '@angular/router';

import swal from 'sweetalert2';
import { RoleService } from './service/role.service';
import { QueryParam, Role } from './model';
import { SnackBar } from '../../../../tool/snackbar';
import { flyInOutAnimation } from '../../../../tool/animation';

@Component({
  templateUrl: './role.component.html',
  animations: [flyInOutAnimation],
  providers: [RoleService]
})
export class RoleComponent implements OnInit {
  public totalRecords: number = 0;
  public currentPage: number = 1;
  public roles: any[];
  public queryParam: QueryParam;

  constructor(
    private roleService: RoleService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private snackbar: SnackBar
  ) {
    this.queryParam = new QueryParam();
  }

  public ngOnInit() {
    this.activedRoute.queryParams.subscribe((params: Params) => {
      this.queryParam.pageNum = Number(params['pageNum']) || 1;
      this.queryParam.name = params['name'] || null;
      this.queryParam.createTimeSort = Number(params['sort']) || 0;
      this.queryParam.active = params['active'] || null;

      this.currentPage = this.queryParam.pageNum;
      this.getRoleList();
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
   * 按照角色名查询
   * @param key
   */
  public onSearch(name: string) {
    this.router.navigate(['./'], {
      relativeTo: this.activedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        name,
        pageNum: 1
      }
    });
  }

  /**
   * 过滤角色状态
   * @param State
   */
  public onChangeActive(active: number): void {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        active,
        pageNum: 1
      }
    };
    this.router.navigate([], navigationExtras);
  }

  /**
   * 按创建时间排序
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
        this.deleteRole(id);
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
  private getRoleList() {
    this.roleService.getRoleList(this.queryParam).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.roles = data.data;
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
  private deleteRole(id: number) {
    this.roleService.deleteRole(id).subscribe((data: any) => {
      if ('2000' === data.code) {
        this.snackbar.success('删除用户成功');
        this.getRoleList();
      }
    });
  }
}
