type NotifyContractFulfillingParams = {
  contractId : number,
  pilotId: number
}

interface NotifyContractFulfilling {
  handle(params : NotifyContractFulfillingParams) : Promise<void>
}

export { NotifyContractFulfillingParams };

export default NotifyContractFulfilling;
