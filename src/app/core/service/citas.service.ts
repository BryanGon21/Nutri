import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CitasService extends BaseAPIClass{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/citas';
  }
  
  estadoEnCurso(data:any):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/encurso',data);
  }

  estadoTerminado(data:any):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/terminar',data);
  }
  citas_medico():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/medico')
  }

}
