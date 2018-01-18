import Http from '../../../http';

class SettingService {
  constructor() {
    this.http = new Http();
  }

  /**
   * upload image
   *
   * @param {any} formData
   * @returns
   * @memberof SettingService
   */
  upload(formData) {
    const method = '/common/uploadPicture';
    return this.http.POST(method, formData, { isFormData: false });
  }
}

export default SettingService;
