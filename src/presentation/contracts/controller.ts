import { HttpResponse } from '@/presentation/contracts/http';

interface Controller<TRequestData> {
  handle: (request?: TRequestData) => Promise<HttpResponse>
}

export default Controller;
