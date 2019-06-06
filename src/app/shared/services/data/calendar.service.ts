import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from '../api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { CandidateScheduleContentModel } from '@app/shared/model/candidate-schedule.model';
import { CandidateScheduleGetTime } from '@app/shared/model/candidate-schedule-get-time.model';

@Injectable({ providedIn: 'root' })
export class CalendarService {

  constructor(private api: ApiService) { }

  getByTime(dateParam: CandidateScheduleGetTime): Observable<ApiResponse<Pageable<CandidateScheduleContentModel>>> {
    return this.api.post<Pageable<CandidateScheduleContentModel>>('candidate-schedule/time', dateParam);
  }
}
