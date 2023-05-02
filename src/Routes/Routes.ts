import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotoController from '../Controllers/MotoController';

const routes = Router();

routes.post('/cars', (req, res, next) => new CarController(req, res, next).create());
routes.get('/cars', (req, res, next) => new CarController(req, res, next).getAll());
routes.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getById());
routes.put('/cars/:id', (req, res, next) => new CarController(req, res, next).updateController());
routes.post('/motorcycles', (req, res, next) => new MotoController(req, res, next).create());
routes.get('/motorcycles', (req, res, next) => new MotoController(req, res, next).getAll());
// routes.put('/cars/:id', (req, res) => res.status(200).json('oiii'));
export default routes;
