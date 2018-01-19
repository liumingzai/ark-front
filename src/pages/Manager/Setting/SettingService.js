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
    const config = {};
    config.headers = {
      'Content-Type': false,
    };
    config.isFormData = false;
    return this.http.POST(method, formData, config);
  }
}

export default SettingService;
