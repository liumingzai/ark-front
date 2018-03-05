import Http from '../../http';

class LoginService {
  constructor() {
    this.http = new Http();
  }

  /**
   * Login by password
   *
   * @param {any} username
   * @param {any} password
   * @returns
   * @memberof LoginService
   */
  loginByPassword(username, password) {
    const method = '/account/loginByPassword';
    return this.http.POST(
      method,
      { authentication: username, password: btoa(password) },
      { isFormData: true },
    );
  }
}

export default LoginService;
