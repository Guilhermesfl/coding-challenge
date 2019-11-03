import { Router } from 'express';
import AbsenceController from './app/controllers/AbsenceController';
import VacationController from './app/controllers/VacationController';

const routes = new Router();

routes.get('/absences', AbsenceController.index);
routes.get('/absences/vacations', VacationController.index);

export default routes;
