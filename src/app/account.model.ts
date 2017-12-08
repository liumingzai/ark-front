/**
 * Account 用户的基本信息
 * type 0-管理员，1管理员  2临港  3普通注册用户
 */
export class Account {
  public username: string;
  public type: number;
  public typeName: string;
  public logo: string;
  public phone: number;
  public roles: any[];

  constructor(
    username: string = null,
    type: number = null,
    typeName: string = null,
    logo: string = null,
    phone: number = null,
    roles: any[] = []
  ) {
    this.username = username;
    this.type = type;
    this.typeName = typeName;
    this.logo = logo;
    this.phone = phone;
    this.roles = roles;
  }
}
