import IVehicle from './IVehicle';

interface IMoto extends IVehicle {
  category: string
  engineCapacity: number 
}

export default IMoto;