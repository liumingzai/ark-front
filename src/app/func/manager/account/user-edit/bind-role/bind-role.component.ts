import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleService } from '../../role/service/role.service';
import { BindRole } from './bind-role.model';
import * as _ from 'lodash';

@Component({
  templateUrl: './bind-role.component.html',
  providers: [RoleService]
})
export class BindRoleComponent {
  public allRoles: Array<{ id: number; name: string; isSelected: boolean }>;

  constructor(
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: { roles: BindRole[] },
    public dialogRef: MatDialogRef<BindRoleComponent>
  ) {
    this.getAllRole();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onClaime(): void {
    const roles = this.allRoles.filter(e => e.isSelected === true).map((e: any) => {
      return { id: e.id, name: e.name };
    });
    this.dialogRef.close({
      roles
    });
  }

  /**
   * 获取角色列表-复选框
   */
  private getAllRole() {
    this.roleService.getAllRole().subscribe((data: any) => {
      if ('2000' === data.code) {
        const roles = data.data.map((e: any) => {
          return {
            id: e.id,
            name: e.name,
            isSelected: this.data.roles && this.data.roles.length > 0 && this.arrayIncludeObj(e) ? true : false
          };
        });
        this.allRoles = roles;
      }
    });
  }

  /**
   * 用于替代Array的IndexOf，因为indexOf参数不能查找引用类型
   * @param name
   */
  public arrayIncludeObj(obj: any): boolean {
    let returnData = false;
    this.data.roles.map((e: any) => {
      if (_.includes(obj, e.name)) {
        returnData = true;
      }
    });
    return returnData;
  }
}
