import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { URI } from '../config/uri';
import { ICotizacion } from '../models/cotizacion';
import { IMessage } from '../models/message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  create(cotizacion: ICotizacion): Observable<IMessage> {
    return this.http
      .post<IMessage>(`${URI.baseURL}${URI.cuote}`, cotizacion, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  update(cotizacion: ICotizacion): Observable<IMessage> {
    return this.http
      .put<IMessage>(`${URI.baseURL}${URI.cuote}`, cotizacion, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<IMessage> {
    return this.http
      .delete<IMessage>(`${URI.baseURL}${URI.cuote}/${id}`, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<ICotizacion> {
    return this.http
      .get<ICotizacion>(`${URI.baseURL}${URI.cuote}/one/${id}`, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  getAll(): Observable<ICotizacion[]> {
    return this.http
      .get<ICotizacion[]>(`${URI.baseURL}${URI.cuote}/all`, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  getReporte(id: number) {
    return this.http.get<any>(`${URI.baseURL}${URI.cuote}/reporte/${id}`, {
      headers: {
        'x-access-token': this.authService.token,
      },
      responseType: 'blob' as 'json',
    });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) errorMessage = error.error.message;
    else errorMessage = error.error.message;

    return throwError(errorMessage);
  }
}
