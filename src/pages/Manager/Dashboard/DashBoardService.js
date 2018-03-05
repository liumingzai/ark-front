import Http from '../../../http';

class DashboardService {
  constructor() {
    this.http = new Http();
  }

  getDatas() {
    const method = 'admin/um/getHomePage';
    return this.http.GET(method);
  }
}

export default DashboardService;
