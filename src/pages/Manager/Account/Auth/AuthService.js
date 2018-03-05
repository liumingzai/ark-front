import Http from '../../../../http';

class AuthService {
  constructor() {
    this.http = new Http();
  }

  /**
   * 获取作用域信息下拉列表
   *
   * @returns
   * @memberof AuthService
   */
  getScopes() {
    const method = '/admin/pm/getPermissionScope';
    return this.http.GET(method);
  }

  /**
   * 获取过滤器下拉列表
   *
   * @returns
   * @memberof AuthService
   */
  getFilters() {
    const method = '/admin/pm/getPermissionFilters';
    return this.http.GET(method);
  }

  /**
   * 获取用户列表
   *
   * @param {any} queryParam
   * @returns
   * @memberof AuthService
   */
  getAuthList(queryParam) {
    const method = '/admin/pm/getPermissions';
    return this.http.GET(method, queryParam || {});
  }

  /**
   * Add Role
   *
   * @param {any} role
   * @returns
   * @memberof AuthService
   */
  addAuth(role) {
    const method = '/admin/pm/addPermissions';
    return this.http.POST(method, role, { isFormData: false });
  }

  /**
   * Update Role
   *
   * @param {any} role
   * @returns
   * @memberof AuthService
   */
  updateAuth(role) {
    const method = '/admin/pm/updatePermissions';
    return this.http.PUT(method, role);
  }

  /**
   * Get Role By RoleId
   *
   * @param {number} id
   * @returns
   * @memberof AuthService
   */
  getAuthById(id) {
    const method = '/admin/pm/getPermissionsById';
    return this.http.GET(method, { id });
  }

  /**
   * Delete Role By RoleId
   *
   * @param {number} id
   * @returns
   * @memberof AuthService
   */
  deleteAuthById(id) {
    const method = '/admin/pm/deletePermissions';
    return this.http.DELETE(method, { id });
  }
}

export default AuthService;
