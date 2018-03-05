import Http from '../../../../http';

class RoleService {
  constructor() {
    this.http = new Http();
  }

  /**
   * 获取用户列表
   *
   * @param {any} queryParam
   * @returns
   * @memberof RoleService
   */
  getRoleList(queryParam) {
    const method = '/admin/pm/getRole';
    return this.http.GET(method, queryParam || {});
  }

  /**
   * Add Role
   *
   * @param {any} role
   * @returns
   * @memberof RoleService
   */
  addRole(role) {
    const method = '/admin/pm/addRole';
    return this.http.POST(method, role, { isFormData: false });
  }

  /**
   * Update Role
   *
   * @param {any} role
   * @returns
   * @memberof RoleService
   */
  updateRole(role) {
    const method = '/admin/pm/updateRole';
    return this.http.PUT(method, role);
  }

  /**
   * Get Role By RoleId
   *
   * @param {number} id
   * @returns
   * @memberof RoleService
   */
  getRoleById(id) {
    const method = '/admin/pm/getRoleById';
    return this.http.GET(method, { id });
  }

  /**
   * Delete Role By RoleId
   *
   * @param {number} id
   * @returns
   * @memberof RoleService
   */
  deleteRoleById(id) {
    const method = '/admin/pm/deleteRole';
    return this.http.DELETE(method, { id });
  }

  /**
   * 获取已绑定的资源列表
   *
   * @param {any} id
   * @returns
   * @memberof RoleService
   */
  getBindsByRoleId(id, pageNum) {
    const method = '/admin/pm/getRoleBindPermissions';
    return this.http.GET(method, { id, pageNum });
  }

  /**
   * 获取未绑定资源列表
   *
   * @param {any} id
   * @returns
   * @memberof RoleService
   */
  getUnBindsByRoleId(id, pageNum) {
    const method = '/admin/pm/getRoleUnbindPermissions';
    return this.http.GET(method, { id, pageNum });
  }

  /**
   * 添加绑定
   *
   * @param {any} id
   * @param {any} permissions
   * @returns
   * @memberof RoleService
   */
  addBind(id, permissions) {
    const method = '/admin/pm/addRolePermissions';
    return this.http.POST(method, { id, permissions });
  }

  /**
   * 解除绑定
   *
   * @param {any} id
   * @param {any} permissions
   * @returns
   * @memberof RoleService
   */
  deleteBind(id, permissions) {
    const method = '/admin/pm/deleteRolePermissions';
    return this.http.POST(method, { id, permissions });
  }
}

export default RoleService;
