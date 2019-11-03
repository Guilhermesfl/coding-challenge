import { Router } from 'express';
import AbsenceController from './app/controllers/AbsenceController';
import VacationController from './app/controllers/VacationController';
import SicknessController from './app/controllers/SicknessController';

const routes = new Router();

routes.get('/absences', AbsenceController.index);
routes.get('/absences/vacations', VacationController.index);
routes.get('/absences/sickness', SicknessController.index);

export default routes;
