import Http from '../../../../http';

class UserService {
  constructor() {
    this.http = new Http();
  }

  /**
   * 获取用户列表
   *
   * @param {any} queryParam
   * @returns
   * @memberof UserService
   */
  getUserList(queryParam) {
    const method = '/admin/um/getAccountList';
    return this.http.GET(method, queryParam || {});
  }

  /**
   * Add User
   *
   * @param {any} user
   * @returns
   * @memberof UserService
   */
  addUser(user) {
    const method = '/admin/um/addAccount';
    return this.http.POST(method, user, { isFormData: false });
  }

  /**
   * Update User
   *
   * @param {any} user
   * @returns
   * @memberof UserService
   */
  updateUser(user) {
    const method = '/admin/um/updateAccount';
    return this.http.PUT(method, user);
  }

  /**
   * Get User By UserId
   *
   * @param {number} id
   * @returns
   * @memberof UserService
   */
  getUserById(accountId) {
    const method = '/admin/um/getAccountById';
    return this.http.GET(method, { accountId });
  }

  /**
   * Delete User By UserId
   *
   * @param {number} id
   * @returns
   * @memberof UserService
   */
  deleteUserById(id) {
    const method = '/admin/um/deleteAccount';
    return this.http.DELETE(method, { id });
  }
}

export default UserService;
