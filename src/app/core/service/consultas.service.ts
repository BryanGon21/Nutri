import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/consultas'
  }

  consulta_paciente(id:any):Observable<any>{
    return this.httpClient.get(this.baseUrl+'/pacientes/'+id)
  }

}
