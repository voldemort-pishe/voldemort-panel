import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jmoment from 'jalali-moment';

import { environment as env } from '@env/environment';
import { map } from 'rxjs/operators';
import { DateRange } from "@app/shared/model/date-range.model";
import { ApiService, ApiResponse } from './api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { Moment } from 'jalali-moment';
import { CandidateScheduleModel, CandidateScheduleContentModel } from '@app/shared/model/candidate-schedule.model';

type EntityArrayResponseType = HttpResponse<Pageable<CandidateScheduleContentModel>>;
type EntityResponseType = HttpResponse<CandidateScheduleContentModel>;

@Injectable({ providedIn: 'root' })
export class CandidateScheduleService {

  private resourceUrl = env.serverApiUrl + 'candidate-schedule';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  create(candidateSchedule: CandidateScheduleModel): Observable<EntityResponseType> {
    return this.http.post<CandidateScheduleContentModel>(`${this.resourceUrl}`, candidateSchedule, { observe: 'response' });
  }

  byOwner(): Observable<EntityArrayResponseType> {
    return this.http.get<Pageable<CandidateScheduleContentModel>>(`${this.resourceUrl}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  byOwnerAndDate(dateRange: DateRange): Observable<EntityArrayResponseType> {
    const copy = this.convertDateFromClient(dateRange);
    return this.http.post<Pageable<CandidateScheduleContentModel>>(`${this.resourceUrl}/time`, copy, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  byCandidateId(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<Pageable<CandidateScheduleContentModel>>(`${this.resourceUrl}/candidate/${id}`, { observe: 'response' })
  }

  private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    res.body.content.forEach((candidateSchedule: CandidateScheduleContentModel) => {
      (candidateSchedule.data as any).startDate = candidateSchedule.data.startDate != null ? jmoment(candidateSchedule.data.startDate) : null;
      (candidateSchedule.data as any).endDate = candidateSchedule.data.endDate != null ? jmoment(candidateSchedule.data.endDate) : null;
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

  getList(): Observable<ApiResponse<Pageable<CandidateScheduleContentModel>>> {
    return this.apiService.get<Pageable<CandidateScheduleContentModel>>('candidate-schedule');
  }

  getListByCandidate(candidateId: number): Observable<ApiResponse<Pageable<CandidateScheduleContentModel>>> {
    return this.apiService.get<Pageable<CandidateScheduleContentModel>>(`candidate-schedule/candidate/${candidateId}`);
  }

  getListByDate(startDate: Moment, endDate: Moment): Observable<ApiResponse<Pageable<CandidateScheduleContentModel>>> {
    const req = {
      startDate: this.moment2JsonDate(startDate),
      endDate: this.moment2JsonDate(endDate),
    };
    return this.apiService.post<Pageable<CandidateScheduleContentModel>>('candidate-schedule/time', req);
  }

  private moment2JsonDate(date: Moment): string {
    return date != null && date.isValid() ? date.toJSON() : null;
  }
}
