import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { PaymentModel } from "@app/shared/model/payment.model";

@Injectable({ providedIn: 'root' })
export class PaymentService {

  constructor(private api: ApiService) { }

  createPaymentUrl(invoiceId: number): Observable<ApiResponse<PaymentModel>> {
    return this.api.post<PaymentModel>(`payment/${invoiceId}`);
  }
}
