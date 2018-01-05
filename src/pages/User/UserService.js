import Http from '../../http';

class UserService {
  constructor() {
    this.http = new Http();
  }

  addUser(user) {
    const method = '/admin/um/addAccount';
    return this.http.POST(method, user);
  }
}

export default UserService;
