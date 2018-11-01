import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jmoment from 'jalali-moment';

import { environment as env } from '@env/environment';
import {CandidateSchedule, ContentSchedule} from "@app/shared/model/candidate-schedule.model";
import {map} from 'rxjs/operators';
import {DateRange} from "@app/shared/model/date-range.model";

type EntityArrayResponseType = HttpResponse<CandidateSchedule>;

@Injectable({ providedIn: 'root' })
export class CandidateScheduleService {

  private resourceUrl = env.serverApiUrl + 'api/candidate-schedule';

  constructor(private http: HttpClient) {}

  byOwner(): Observable<EntityArrayResponseType> {
    return this.http.get<CandidateSchedule>(`${this.resourceUrl}/owner`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  byOwnerAndDate(dateRange: DateRange): Observable<EntityArrayResponseType> {
    const copy = this.convertDateFromClient(dateRange);
    return this.http.post<CandidateSchedule>(`${this.resourceUrl}/owner`, copy, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    res.body.content.forEach((candidateSchedule: ContentSchedule) => {
      candidateSchedule.data.scheduleDate = candidateSchedule.data.scheduleDate  != null ? jmoment(candidateSchedule.data.scheduleDate ) : null;
    });
    return res;
  }

  private convertDateFromClient(dateRange: DateRange): DateRange {
    const copy: DateRange = Object.assign({}, dateRange, {
      startDate: dateRange.startDate != null && dateRange.startDate.isValid() ? dateRange.startDate.toJSON() : null,
      endDate: dateRange.endDate != null && dateRange.endDate.isValid() ? dateRange.endDate.toJSON() : null
    });
    return copy;
  }

}
