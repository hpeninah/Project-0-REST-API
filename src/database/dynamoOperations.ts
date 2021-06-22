
// Import required AWS SDK clients and commands for Node.js
import { ScanCommand, PutItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from './dynamoClient';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import * as AWS from 'aws-sdk';
import { ddbDocClient } from './dynamoDocClient';
import Member from '../interface/IMember';
import 'dotenv/config'

const TABLE_NAME = "cookieshopmembers-api";

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default class MemberDao {

  //Get all members
  public getAllMembers = async() => {
    const params = {
      TableName: TABLE_NAME
    }

    try{
      const data = await ddbClient.send(new ScanCommand(params));
      return data.Items;
    } catch (err) {
      console.log("Error", err);
    }
  };

  //Get one member by ID
  public getOneMember = async(id:string) => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        'id': id,
      }
    }
    try {
      const data = await ddbDocClient.send(new GetCommand(params));
      return data.Item;
    } catch (err) {
      console.log("Error", err);
    }
  }

  //Add a member
  public addMember = async(member: Member) => {
    const params = {
      TableName: TABLE_NAME,
      Item: member,
    }
    try {
      const data = await ddbClient.send(new PutCommand(params));
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  }

  //Delete a member
  public deleteMember = async(id) => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      }
    }
    try {
      const data = await ddbClient.send(new DeleteItemCommand(params));
      console.log("Success, member deleted", data)
      return data;
    } catch (err) {
      if (err && err.code === "ResourceNotFoundException") {
        console.log("Error: Table not found");
      } else if (err && err.code === "ResourceInUseException") {
        console.log("Error: Table in use");
      }
    }
  }

}