import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/mediciones'
  }

  getProgreso(id:any, tipo:string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/paciente/' + id +"?medida=" + tipo)
  }


}
