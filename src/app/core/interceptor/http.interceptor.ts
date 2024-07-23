import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptor implements HttpInterceptor {

  constructor(
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const excludedUrls = [
      'https://nutriia.onrender.com/generar_plan_dieta'
    ];

      const isExcludedUrl = excludedUrls.some(url => request.url.startsWith(url));

    if (!isExcludedUrl) {
      // Si no es una URL excluida, modificar la solicitud
      request = request.clone({ url: environment.apiUrl + request.url });
    }
 
    
    return next.handle(request);

  }
}
