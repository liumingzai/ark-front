import Http from '../../../../http';

class EntKeywordService {
  constructor() {
    this.http = new Http();
  }

  /**
   * Upload csv file
   *
   * @param {any} upload
   * @returns
   * @memberof EntKeywordService
   */
  uploadKeywordInfo(upload) {
    const method = 'dataManage/uploadKeywordInfo';
    return this.http.POST(method, upload);
  }

  /**
   * download template
   *
   * @returns
   * @memberof EntKeywordService
   */
  getKeywordTemplate() {
    const method = 'dataManage/getKeywordTemplate';
    const url = `${this.http.baseURL}/${method}`;

    window.open(url, '_blank');
  }

  /**
   * Get info
   *
   * @param {any} param
   * @returns
   * @memberof EntKeywordService
   */
  getKeywordInfo(param) {
    const method = 'dataManage/getKeywordInfo';
    const {
      page: pageNum, keyword, province, sort: createTimeSort,
    } = param;
    return this.http.GET(method, {
      pageNum,
      keyword,
      province,
      createTimeSort,
    });
  }

  /**
   *  添加关键字
   *
   * @param {[{keyword, province, priority}]} data
   * @returns
   * @memberof EntKeywordService
   */
  addKeywordInfo(data) {
    const method = 'dataManage/addKeywordInfo';
    return this.http.POST(method, data);
  }

  /**
   * 编辑关键字
   *
   * @param {any} data
   * @returns
   * @memberof EntKeywordService
   */
  updateKeywordInfo(data) {
    const method = 'dataManage/updateKeywordInfo';
    return this.http.PUT(method, data);
  }

  /**
   * 删除关键字
   *
   * @param {any} name
   * @returns
   * @memberof EntKeywordService
   */
  deleteKeywordInfo(keyword) {
    const method = 'dataManage/deleteKeywordInfo';
    return this.http.DELETE(method, { keyword });
  }

  /**
   * Get province
   *
   * @returns
   * @memberof EntKeywordService
   */
  getProvinces() {
    const method = 'dataManage/getProvinces';
    return this.http.GET(method);
  }
}

export default EntKeywordService;
