/**
 * Account 用户的基本信息
 * userType 1-管理员  2-临港  3-API用户, 自定义用户类型，根据包含的roles
 */
class Role {
  id: number;
  name: string;
}

export class Account {
  public username: string;
  public userType: number;
  public typeName: string;
  public logo: string;
  public phone: number;
  public roles: Role[];

  constructor(
    username: string = null,
    userType: number = null,
    typeName: string = null,
    logo: string = null,
    phone: number = null,
    roles: Role[] = []
  ) {
    this.username = username;
    this.userType = userType;
    this.typeName = typeName;
    this.logo = logo;
    this.phone = phone;
    this.roles = roles;
  }
}
