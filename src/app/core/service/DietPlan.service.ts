import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DietPlanService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  generateDietPlan(data: any): Observable<any> {
    console.log('Datos enviados al backend:', data);
    data.restricciones_dieteticas = Array.isArray(data.restricciones_dieteticas) ? data.restricciones_dieteticas : [data.restricciones_dieteticas];
    data.preferencias_alimenticias = Array.isArray(data.preferencias_alimenticias) ? data.preferencias_alimenticias : [data.preferencias_alimenticias];

    return this.http.post<any>(`${this.apiUrl}/generar_plan_dieta`, data).pipe(
      tap(response => console.log('Respuesta del backend:', response)),
      catchError(error => {
        console.error('Error al enviar la solicitud:', error);
        throw error; // Re-throw the error to let the component handle it
      })
    );
  }
}
