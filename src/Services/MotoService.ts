import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotoService {
  private createMotoDomain(moto: IMotorcycle | null) {
    if (moto) {
      return new Motorcycle(moto);
    }
  }

  public async registerMoto(moto: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const newMoto = await motoODM.create(moto);

    return this.createMotoDomain(newMoto);
  }
}
export default MotoService;