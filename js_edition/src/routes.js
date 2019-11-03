import { Router } from 'express';
import AbsenceController from './app/controllers/AbsenceController';

const routes = new Router();

routes.get('/absences', AbsenceController.index);

export default routes;
