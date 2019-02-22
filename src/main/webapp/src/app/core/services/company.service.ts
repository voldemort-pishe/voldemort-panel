import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CompanyService {

  private resourceUrl = env.serverApiUrl + 'company';

  constructor(private apiService: ApiService) { }


}
