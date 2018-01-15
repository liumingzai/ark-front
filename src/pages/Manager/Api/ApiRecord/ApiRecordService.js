import Http from '../../../../http';

class ApiRecordService {
  constructor() {
    this.http = new Http();
  }

  /**
   * For admin
   *
   * @param {any} param
   * @returns
   * @memberof ApiRecordService
   */
  adminGetCountAsscssApi(param) {
    const method = 'admin/api/getCountAsscssApi';
    const {
      page: pageNum, uid, apiName, url, startDate, endDate,
    } = param;

    return this.http.GET(method, {
      pageNum,
      uid,
      apiName,
      url,
      startDate,
      endDate,
    });
  }

  /**
   * For common user
   *
   * @param {any} pageNum
   * @param {any} id
   * @returns
   * @memberof ApiRecordService
   */
  getCountAsscssApi(pageNum, id) {
    const method = 'common/getCountAsscssApi';
    return this.http.GET(method, { pageNum, id });
  }
}

export default ApiRecordService;
