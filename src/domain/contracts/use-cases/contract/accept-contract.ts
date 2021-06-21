type AcceptContractParams = {
  pilotId : number,
  contractId : number
}

interface AcceptContract {
  handle(params : AcceptContractParams) : Promise<void>
}

export { AcceptContractParams };

export default AcceptContract;
