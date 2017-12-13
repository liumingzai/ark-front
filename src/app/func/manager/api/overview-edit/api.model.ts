export class API {
  public apiId?: string;
  public apiName: string;
  public apiPic: string;
  public apiCategory: string;
  public unitPrice: string;
  public publish: number;

  constructor() {
    this.apiCategory = '企业';
    this.apiName = null;
    this.apiPic = null;
    this.unitPrice = null;
    this.publish = 0;
  }
}
