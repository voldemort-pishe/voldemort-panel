import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';
import {PaymentModel} from "@app/shared/model/payment.model";

type EntityArrayResponseType = HttpResponse<PaymentModel>;

@Injectable({ providedIn: 'root' })
export class PaymentService {

  private resourceUrl = env.serverApiUrl + 'payment';

  constructor(private http: HttpClient) {}

  createPaymentUrl(invoiceId: number): Observable<EntityArrayResponseType> {
    return this.http.post<PaymentModel>(`${this.resourceUrl}/${invoiceId}`, null, { observe: 'response' });
  }


}
