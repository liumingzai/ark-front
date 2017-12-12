/**
 * Account 用户的基本信息
 * userType 1-管理员  4-临港  5-API用户
 */
class Role {
  id: number;
  name: string;
}

export class Account {
  public username: string;
  public userType: number[];
  public logo: string;
  public phone: number;
  public roles: Role[];

  constructor(
    username: string = null,
    userType: number[] = null,
    logo: string = null,
    phone: number = null,
    roles: Role[] = []
  ) {
    this.username = username;
    this.userType = userType;
    this.logo = logo;
    this.phone = phone;
    this.roles = roles;
  }
}
