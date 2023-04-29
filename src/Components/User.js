export class User{
    constructor(name,roleType,token,roleID) {
        this.name = name;
        this.roleType = roleType;
        this.access_token = token;
        this.roleID = roleID;
    }

}