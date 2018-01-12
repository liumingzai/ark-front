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
}

export default RoleService;
