import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoComidaService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/tipocomidas'
  }

}
