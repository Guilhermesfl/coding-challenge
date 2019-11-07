import { Router } from 'express';
import AbsenceController from './app/controllers/AbsenceController';
import VacationController from './app/controllers/VacationController';
import SicknessController from './app/controllers/SicknessController';
import CalendarController from './app/controllers/CalendarController';
import mergerMiddleware from '../src/app/middlewares/merger';

const routes = new Router();

routes.use(mergerMiddleware);
routes.get('/', CalendarController.index);
routes.get('/absences', AbsenceController.index);
routes.get('/absences/vacations', VacationController.index);
routes.get('/absences/sickness', SicknessController.index);

export default routes;
