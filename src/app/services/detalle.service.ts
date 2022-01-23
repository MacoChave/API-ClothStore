import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { URI } from '../config/uri';
import { IDetalle } from '../models/cotizacion';
import { IMessage } from '../models/message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DetalleService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  create(detalle: IDetalle): Observable<IMessage> {
    return this.http
      .post<IMessage>(`${URI.baseURL}${URI.detail}`, detalle, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  createAll(detalle: IDetalle[]): Observable<IMessage> {
    return this.http
      .post<IMessage>(`${URI.baseURL}${URI.detail}/all`, detalle, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  update(detalle: IDetalle): Observable<IMessage> {
    return this.http
      .put<IMessage>(`${URI.baseURL}${URI.detail}`, detalle, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<IMessage> {
    return this.http
      .delete<IMessage>(`${URI.baseURL}${URI.detail}/${id}`, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<IDetalle> {
    return this.http
      .get<IDetalle>(`${URI.baseURL}${URI.detail}/one/${id}`, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  getAll(id: any): Observable<IDetalle[]> {
    return this.http
      .get<IDetalle[]>(`${URI.baseURL}${URI.detail}/all/${id}`, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
