import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotoService {
  private createMotoDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  }

  public async registerMoto(moto: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const newMoto = await motoODM.create(moto);

    return this.createMotoDomain(newMoto);
  }

  public async getAll(): Promise<(Motorcycle | null)[]> {
    const motoODM = new MotorcycleODM();
    const result = await motoODM.getAll();

    const motos = result?.map((moto) => this.createMotoDomain(moto));
    return motos;
  }
}
export default MotoService;