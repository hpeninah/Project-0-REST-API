import { Request, Response } from 'express';
import MemberDao from '../database/dynamoOperations';

const memberObject = new MemberDao();

export async function getAllMembers(req:Request, res:Response) {
    const members = await memberObject.getAllMembers();
    
    if(!members) {
        return res.status(404).json("Table is empty!")
    } else {
        return res.status(200).json({members});
    }
}

export async function getMemberByID(req:Request, res:Response) {
    const { id } = req.params;
    const member = await memberObject.getOneMember(id);
    
    if(!member){
        return res.status(404).json("Member was not found.");
    } else {
        return res.status(200).json({member});
    }
}

export async function addOrUpdateMember(req :Request, res: Response) {
    try {
        const member = await memberObject.addOrUpdateMember(req.body);
        return res.status(200).json({member});
    } catch (err) {
        res.status(500).json({err: "Something went wrong"});
    }
}

export async function deleteMemberByID(req:Request, res:Response) {
    const { id } = req.params;
    await memberObject.deleteMember(id);
    return res.status(204).json("Member was deleted!");
}

