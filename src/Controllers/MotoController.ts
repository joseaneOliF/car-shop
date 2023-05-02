import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotoService from '../Services/MotoService';

class MotoController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotoService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotoService();
  }

  public async create() {
    const moto: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue, 
      category: this.req.body.category, 
      engineCapacity: this.req.body.engineCapacity, 
    };
    
    try {
      const newMoto = await this.service.registerMoto(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      // console.log(error);
      
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const motos = await this.service.getAll();
      // console.log(motos);
      
      return this.res.status(200).json(motos);
    } catch (error) {
      this.next(error);
    }
  }
}
export default MotoController;