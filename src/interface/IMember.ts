export interface IMember {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    memberSince: string;
    rewards: number;
}


export default class Member implements IMember {

    public id: number;
    public first_name: string;
    public last_name: string;
    public email: string;
    public memberSince: string;
    public rewards: number;

    constructor(id, first_name, last_name, email, memberSince, rewards){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.memberSince = memberSince;
        this.rewards = rewards;
    }
}