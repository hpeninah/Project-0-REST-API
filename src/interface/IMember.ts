//Interface binds object to define all properties as specified
export interface IMember {
    id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    memberSince?: string;
    rewards?: string;
    favoriteCookie?: string;
}

//Member class implementing IMember interface
class Member implements IMember {

    constructor(
        public id?: string,
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public memberSince?: string,
        public rewards?: string,
        public favoriteCookie?:string
        ){}
}

export default Member;