export class QueryParam {
  public page: number;
  public cat: string;
  public key: string;
  public sort: number;
  public publish?: number; // 0 - 保存, 1 - 发布

  constructor() {
    this.page = 1;
    this.cat = null;
    this.key = null;
    this.sort = null;
  }
}
