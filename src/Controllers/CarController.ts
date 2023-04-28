import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue, 
      doorsQty: this.req.body.doorsQty, 
      seatsQty: this.req.body.seatsQty, 
    };
    // if (!car.status) {
    //   car.status = true;
    // }
    try {
      const newCar = await this.service.register(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      // console.log(error);
      
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const cars = await this.service.getAll();
      // console.log(cars);
      
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const carId = await this.service.getById(id);
      if (carId) {
        return this.res.status(200).json(carId);
      }
      return this.res.status(404).json({ message: 'Car not found' });
    } catch (error: any) {
      return this.res.status(422).json({ message: error.message });
    }
  }

  public async updateController() {
    try {
      const { id } = this.req.params;
      const car: ICar = this.req.body;
      const carUpdated = await this.service.updateService(id, car);
      
      if (carUpdated) {
        return this.res.status(200).json(carUpdated);
      }
      return this.res.status(404).json('Car nor found');
    } catch (error: any) {
      return this.res.status(422).json({ message: error.message });
    }
  }
}

export default CarController;