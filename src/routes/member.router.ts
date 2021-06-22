import {Router} from 'express';
import { addMember, getAllMembers, getMemberByID } from './Members';

const memberRouter = Router();
memberRouter.get('/', getAllMembers);
memberRouter.put('/', addMember);
memberRouter.get('/:id', getMemberByID);

const baseRouter = Router();
baseRouter.use('/members', memberRouter);
export default baseRouter;