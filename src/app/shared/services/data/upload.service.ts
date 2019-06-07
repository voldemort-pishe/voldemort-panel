import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment as env } from '@env/environment';
import { UploadResponse } from "@app/shared/model/upload-response.model";
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UploadService {

  response: UploadResponse;
  private resourceUrl = env.serverApiUrl + 'file';

  constructor(private authService: AuthService,
    private http: HttpClient) { }

  public upload(files: Set<File>): { [key: string]: Observable<number> } {
    const result = {};

    files.forEach(file => {

      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      const req = new HttpRequest('POST', `${this.resourceUrl}/upload`, formData, {
        reportProgress: true,
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.authService.authToken}`
        }),
      });

      const progress = new Subject<number>();

      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          const percentDone = Math.round(100 * event.loaded / event.total);
          progress.next(percentDone);

        } else if (event instanceof HttpResponse) {
          result['response'] = {
            body: event.body
          };
          progress.complete();
        }
      });

      result['filestatus'] = {
        progress: progress.asObservable()
      };
    });

    return result;
  }


}
