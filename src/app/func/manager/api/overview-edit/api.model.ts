export class API {
  public apiId?: number;
  public apiName: string;
  public apiPic: string;
  public apiCategory: string;
  public unitPrice: string;

  constructor() {
    this.apiCategory = '企业';
    this.apiName = null;
    this.apiPic = null;
    this.unitPrice = null;
  }
}
