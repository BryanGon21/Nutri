import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgresoService extends BaseAPIClass{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/plandietas';
   }
   
   

}
