import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment as env} from "@env/environment";
import {Observable} from "rxjs";
import {Province} from "@app/shared/model/province.model";

type EntityArrayResponseType = HttpResponse<Province[]>;


@Injectable({ providedIn: 'root' })
export class ProvinceService {

  private resourceUrl = env.serverApiUrl + 'province';

  constructor(private http: HttpClient) {}

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<Province[]>(`${this.resourceUrl}`, { observe: 'response' });
  }
}
