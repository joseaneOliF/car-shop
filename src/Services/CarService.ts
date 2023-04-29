import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
// import HttpException from '../Middlewares/HttpException';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async register(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);

    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carODM = new CarODM();
    const result = await carODM.getAll();

    const cars = result.map((car) => this.createCarDomain(car));
    return cars;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const carId = await carODM.getById(id);

    return this.createCarDomain(carId);
  }

  public async updateService(id: string, car: ICar): Promise <Car | null> {
    const carODM = new CarODM();
    // const isCar = await carODM.getById(id);
    // if (!isCar) throw new HttpException(404, 'Car not found');
   
    const carUpdated = await carODM.update(id, car);
    
    return this.createCarDomain(carUpdated);
  }
}
export default CarService;