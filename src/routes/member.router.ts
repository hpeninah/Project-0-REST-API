import {Router} from 'express';
import { addMember, deleteMemberByID, getAllMembers, getMemberByID } from './Members';

const memberRouter = Router();
memberRouter.get('/', getAllMembers);
memberRouter.put('/', addMember);
memberRouter.get('/:id', getMemberByID);
memberRouter.delete('/delete/:id', deleteMemberByID);

const baseRouter = Router();
baseRouter.use('/members', memberRouter);
export default baseRouter;