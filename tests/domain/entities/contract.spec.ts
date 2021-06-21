import Contract, { CreateContractData } from '@/domain/entities/contract';
import Planets from '@/domain/enums/planet';
import ContractStatus from '@/domain/enums/contract-status';

describe('Contract', () => {
  test('it should create a contract with correct values', () => {
    const contractData : CreateContractData = {
      description: 'test',
      originPlanet: Planets.Andvari,
      destinationPlanet: Planets.Aqua,
      value: 10,
      id: 1,
    };

    const contract = new Contract(contractData);

    expect(contract).toMatchObject(contractData);
  });

  test('it should create a contract with value 0 if value passed is negative', () => {
    const contractData : CreateContractData = {
      description: 'test',
      originPlanet: Planets.Andvari,
      destinationPlanet: Planets.Aqua,
      value: -10,
      id: 1,
    };

    const contract = new Contract(contractData);

    expect(contract.value).toStrictEqual(0);
  });

  test('it should create a contract with "Open" status if no value is passed', () => {
    const contractData : CreateContractData = {
      description: 'test',
      originPlanet: Planets.Andvari,
      destinationPlanet: Planets.Aqua,
      value: 10,
      id: 1,
    };

    const contract = new Contract(contractData);

    expect(contract.status).toStrictEqual(ContractStatus.Open);
  });
});
