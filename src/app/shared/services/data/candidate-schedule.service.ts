import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Moment } from 'jalali-moment';
import { ApiService, ApiResponse } from '../api.service';
import { Pageable } from '@app/shared/model/pageable.model';
import { CandidateScheduleContentModel } from '@app/shared/model/candidate-schedule.model';

@Injectable({ providedIn: 'root' })
export class CandidateScheduleService {

  constructor(private api: ApiService) { }

  create(data: any): Observable<ApiResponse<CandidateScheduleContentModel>> {
    return this.api.post<CandidateScheduleContentModel>('candidate-schedule', data);
  }

  // duplicate of getList
  // byOwner(): Observable<ApiResponse<Pageable<CandidateScheduleContentModel>>> {
  //   return this.api.get<Pageable<CandidateScheduleContentModel>>('candidate-schedule');
  //    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  // }

  // duplicate of getListByDate
  // byOwnerAndDate(dateRange: DateRange): Observable<ApiResponse<Pageable<CandidateScheduleContentModel>>> {
  //   const copy = this.convertDateFromClient(dateRange);
  //   return this.api.post<Pageable<CandidateScheduleContentModel>>(`candidate-schedule/time`, copy);
  //    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  // }

  // duplicate of getListByCandidate
  // byCandidateId(id: number): Observable<ApiResponse<Pageable<CandidateScheduleContentModel>>> {
  //   return this.api.get<Pageable<CandidateScheduleContentModel>>(`candidate-schedule/candidate/${id}`)
  // }

  // private convertDateArrayFromServer(res: HttpResponse<Pageable<CandidateScheduleContentModel>>): HttpResponse<Pageable<CandidateScheduleContentModel>> {
  //   res.body.content.forEach((candidateSchedule: CandidateScheduleContentModel) => {
  //     (candidateSchedule.data as any).startDate = candidateSchedule.data.startDate != null ? jmoment(candidateSchedule.data.startDate) : null;
  //     (candidateSchedule.data as any).endDate = candidateSchedule.data.endDate != null ? jmoment(candidateSchedule.data.endDate) : null;
  //   });
  //   return res;
  // }

  // TODO ?
  // private convertDateFromClient(dateRange: DateRange): DateRange {
  //   const copy: DateRange = Object.assign({}, dateRange, {
  //     startDate: dateRange.startDate != null && dateRange.startDate.isValid() ? dateRange.startDate.toJSON() : null,
  //     endDate: dateRange.endDate != null && dateRange.endDate.isValid() ? dateRange.endDate.toJSON() : null
  //   });
  //   return copy;
  // }

  getList(): Observable<ApiResponse<Pageable<CandidateScheduleContentModel>>> {
    return this.api.get<Pageable<CandidateScheduleContentModel>>('candidate-schedule');
  }

  getListByCandidate(candidateId: number): Observable<ApiResponse<Pageable<CandidateScheduleContentModel>>> {
    return this.api.get<Pageable<CandidateScheduleContentModel>>(`candidate-schedule/candidate/${candidateId}`);
  }

  getListByDate(startDate: Moment, endDate: Moment): Observable<ApiResponse<Pageable<CandidateScheduleContentModel>>> {
    const req = {
      startDate: this.moment2JsonDate(startDate),
      endDate: this.moment2JsonDate(endDate),
    };
    return this.api.post<Pageable<CandidateScheduleContentModel>>('candidate-schedule/time', req);
  }

  private moment2JsonDate(date: Moment): string {
    return date != null && date.isValid() ? date.toJSON() : null;
  }
}
