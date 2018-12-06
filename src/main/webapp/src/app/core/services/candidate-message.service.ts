import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from '@env/environment';
import {CandidateMessageVm} from "@app/shared/model/candidate-message-vm.model";
import {CandidateMessage} from "@app/shared/model/candidate-message.model";

type EntityResponseType = HttpResponse<CandidateMessageVm>;

@Injectable({ providedIn: 'root' })
export class CandidateMessageService {

  private resourceUrl = env.serverApiUrl + 'candidate-message';

  constructor(private http: HttpClient) {}

  create(candidateMessage: CandidateMessage): Observable<EntityResponseType> {
    return this.http.post<CandidateMessageVm>(`${this.resourceUrl}/create-specific`, candidateMessage, { observe: 'response' });
  }

  getAllCandidateMessage(candidateId: number): Observable<EntityResponseType> {
    return this.http.get<CandidateMessageVm>(`${this.resourceUrl}/candidate/${candidateId}`, { observe: 'response' });
  }

}
