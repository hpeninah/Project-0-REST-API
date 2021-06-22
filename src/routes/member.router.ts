import {Router} from 'express';
import { addOrUpdateMember, deleteMemberByID, getAllMembers, getMemberByID } from './Members';

const memberRouter = Router();
memberRouter.get('/', getAllMembers);
memberRouter.post('/', addOrUpdateMember);
memberRouter.put('/', addOrUpdateMember);
memberRouter.get('/:id', getMemberByID);
memberRouter.delete('/:id', deleteMemberByID);

const baseRouter = Router();
baseRouter.use('/members', memberRouter);
export default baseRouter;