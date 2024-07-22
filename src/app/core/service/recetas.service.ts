import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecetasService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/recetas'
  }
  crearRecetas(form:any):any{
    return this.httpClient.post(this.baseUrl, form).pipe(
      map((body: any) => {
        return body;
      })
    );
  }


}
