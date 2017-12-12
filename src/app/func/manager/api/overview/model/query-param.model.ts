export class QueryParam {
  public page: number;
  public cat: string;
  public key: string;
  public sort: number;

  constructor() {
    this.page = 1;
    this.cat = null;
    this.key = null;
    this.sort = null;
  }
}
