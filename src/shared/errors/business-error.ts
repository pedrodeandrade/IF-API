class BusinessError extends Error {
  constructor(message?: string) {
    super(message);

    this.name = 'BusinessError';
  }
}

export default BusinessError;
