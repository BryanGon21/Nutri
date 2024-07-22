import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BaseAPIClass } from '../class/baseAPI.class';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/users';
  }

  getAllRoles(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/roles')
  }

  getUsuariosMedicos():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/medicos');
  }
  
  registrarUsuario(data:any):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/register',data);
  }

  cambiarPassword(data: any) : Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/change-password`, data);
  }
}

