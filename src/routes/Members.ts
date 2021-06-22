import { Request, Response } from 'express';
import MemberDao from '../database/dynamoOperations';

const memberObject = new MemberDao();

export async function getAllMembers(req:Request, res:Response) {
    const members = await memberObject.getAllMembers();
    return res.status(200).json({members});
}

export async function getMemberByID(req:Request, res:Response) {
    const id = req.params.id;
    const member = await memberObject.getOneMember(id);
    return res.status(200).json({member});
}

export async function addMember(req :Request, res: Response) {
    const member = await memberObject.addMember(req.body);
    return res.status(200).json({member});
}

export async function deleteMemberByID(req:Request, res:Response) {
    const id = req.params.id;
    const member = await memberObject.deleteMember(id);
    return res.status(200).end();
}

