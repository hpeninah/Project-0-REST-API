
// Import required AWS SDK clients and commands for Node.js
import { ScanCommand, GetItemCommand, PutItemCommand, DeleteItemCommand, DynamoDBClient} from "@aws-sdk/client-dynamodb";
import * as AWS from 'aws-sdk';
import IMember from '../interface/IMember';
import Member from '../interface/IMember';
import 'dotenv/config';

// Configuration to access DynamoDB database
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = "cookieshopAPI";
const ddbClient = new DynamoDBClient({ region: process.env.region });

//Interface binds object to define all properties as specified
export interface IMemberObject {
  getAllMembers: () => Promise<IMember[]>;
  getOneMember: (id:string, email:string) => Promise<IMember | null >;
  addOrUpdateMember: (member:IMember) => Promise<IMember | null >;
  deleteMember: (id:string, email:string) => Promise<void>;
}

class MemberDao implements IMemberObject {

  //Get all members
  public async getAllMembers():Promise<IMember[]> {
    const params = {
      TableName: TABLE_NAME
    };

    const data = await ddbClient.send(new ScanCommand(params));
    return data.Items as Member[];
  };

  //Get one member by ID
  public async getOneMember(id:string):Promise<IMember | null >{
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: { S: id },
      }
    }

    const data = await ddbClient.send(new GetItemCommand(params));
    if(data.Item === undefined) {
      console.log("No member found!")
    } else {
      console.log("Success", data.Item);
      return data.Item as Member;
    }
  }

  //Add or Update a member
  public async addOrUpdateMember(member:IMember): Promise<IMember | null> {
    const { id, first_name, last_name, email, memberSince, rewards } = member;

    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: { S: id },
        first_name: { S: first_name },
        last_name: { S: last_name },
        email: { S: email },
        memberSince: { S: memberSince },
        rewards: { S: rewards }
      }
    }

    const body = {
      TableName: TABLE_NAME,
      Key: {
        id: { S: id },
      }
    }

    await ddbClient.send(new PutItemCommand(params));
    const newMember = await ddbClient.send(new GetItemCommand(body));
    console.log("Success, member created!", newMember.Item);
    return newMember.Item as Member;
  }

  //Delete a member by the ID
  public async deleteMember(id: string): Promise<void> {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: { S: id },
      }
    }

    const data = await ddbClient.send(new DeleteItemCommand(params));
    console.log(`Success, member ${id} deleted!`);
  }

}

export default MemberDao;