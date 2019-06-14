import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { InvoiceModel } from '@app/shared/model/invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoiceService {

  constructor(private api: ApiService) { }

  getList(): Observable<ApiResponse<Pageable<InvoiceModel>>> {
    return this.api.get<Pageable<InvoiceModel>>('invoice');
  }
}
