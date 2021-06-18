class OperationResult<TData> {
  public success : boolean

  public message? : string

  public data? : TData

  public constructor(success : boolean, data? : TData, message? : string) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export default OperationResult;
