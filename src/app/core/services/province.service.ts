import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProvinceModel } from "@app/shared/model/province.model";
import { ApiResponse } from './api.service';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class ProvinceService {

  constructor(private cacheService: CacheService) { }

  getList(): Observable<ApiResponse<ProvinceModel[]>> {
    return this.cacheService.getDataOnce<ProvinceModel[]>('province');
  }
}
