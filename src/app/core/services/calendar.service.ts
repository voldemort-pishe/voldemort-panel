import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from '@env/environment';
import {CandidateSchedulePage} from "@app/shared/model/candidate-schedule/candidate-schedule-page.model";
import {CandidateScheduleGetTime} from "@app/shared/model/candidate-schedule/candidate-schedule-get-time.model";

type EntityResponseType = HttpResponse<CandidateSchedulePage>;

@Injectable({ providedIn: 'root' })
export class CalendarService {

  private resourceUrl = env.serverApiUrl + 'candidate-schedule';

  constructor(private http: HttpClient) {}

  getByTime(dateParam: CandidateScheduleGetTime): Observable<EntityResponseType> {
    return this.http.post<CandidateSchedulePage>(`${this.resourceUrl}/time`, dateParam, { observe: 'response' });
  }


}
