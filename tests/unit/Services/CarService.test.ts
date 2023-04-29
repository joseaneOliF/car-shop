import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

const service = new CarService();

describe('Camada Service', function () {
  describe('Com Parâmetros válidos', function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    
    it('Cria um carro com sucesso', async function () {
      const carOutput = new Car({ id: '644bd1418f6917399103e3c8', ...carInput });
      sinon.stub(Model, 'create').resolves(carOutput);
      
      const result = await service.register(carInput);

      expect(result).to.be.deep.equal(carOutput);
    });

    it('Retorna uma lista com todos os carros', async function () { // aqui retorna um array de carros
      const carOutput = [
        new Car({
          id: '644bd1418f6917399103e3c8',
          model: 'Tempra',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 18.99,
          doorsQty: 4,
          seatsQty: 5,
        }),
      ];
      sinon.stub(Model, 'find').resolves(carOutput);
      
      const result = await service.getAll();

      expect(result).to.be.deep.equal(carOutput);
    });

    it('busca um id', async function () { // aqui não é um array, mas apenas um carro
      const carOutput = new Car({
        id: '644bd1418f6917399103e3c8',
        model: 'Tempra',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 18.99,
        doorsQty: 4,
        seatsQty: 5,
      });
      sinon.stub(Model, 'findById').resolves(carOutput);
     
      const result = await service.getById('644bd1418f6917399103e3c8');

      expect(result).to.be.deep.equal(carOutput);
    });

    it('Atualiza um carro com sucesso', async function () {
      const carOutput = new Car({ id: '644bd1418f6917399103e3c8', ...carInput });
      sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);
      
      const result = await service.updateService('644bd1418f6917399103e3c8', carInput);

      expect(result).to.be.deep.equal(carOutput);
    });
  });

  describe('Casos de erro ou parâmetros inválidos', function () {
    it('Retorna uma excessão caso o id seja inválido', async function () {
      sinon.stub(Model, 'findById').resolves();
      
      try {
        await service.getById('644bd1');
      } catch (error) {
        expect((error as Error).message).to.be.deep.equal('Invalid mongo id');
      }
    });

    it('Retorna uma excessão caso um carro não seja encontrado', async function () {
      sinon.stub(Model, 'findById').resolves();
      try {
        await service.getById('644bd1418f6917399103e3c0');
      } catch (error) {
        expect((error as Error).message).to.be.deep.equal('Car not found');
      }
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});