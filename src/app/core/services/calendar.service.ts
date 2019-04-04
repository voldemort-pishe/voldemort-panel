import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';
import { Pageable } from '@app/shared/model/pageable.model';
import { CandidateScheduleContentModel } from '@app/shared/model/candidate-schedule.model';
import { CandidateScheduleGetTime } from '@app/shared/model/candidate-schedule-get-time.model';

type EntityResponseType = HttpResponse<Pageable<CandidateScheduleContentModel>>;

@Injectable({ providedIn: 'root' })
export class CalendarService {

  private resourceUrl = env.serverApiUrl + 'candidate-schedule';

  constructor(private http: HttpClient) { }

  getByTime(dateParam: CandidateScheduleGetTime): Observable<EntityResponseType> {
    return this.http.post<Pageable<CandidateScheduleContentModel>>(`${this.resourceUrl}/time`, dateParam, { observe: 'response' });
  }


}
