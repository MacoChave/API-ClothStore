import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { URI } from '../config/uri';
import { ICliente } from '../models/cliente';
import { IMessage } from '../models/message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  create(cliente: ICliente): Observable<IMessage> {
    return this.http
      .post<IMessage>(`${URI.baseURL}${URI.client}`, cliente, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  update(cliente: ICliente): Observable<IMessage> {
    return this.http
      .put<IMessage>(`${URI.baseURL}${URI.client}`, cliente, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<ICliente> {
    return this.http
      .get<ICliente>(`${URI.baseURL}${URI.client}/one/${id}`, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  getAll(): Observable<ICliente[]> {
    return this.http
      .get<ICliente[]>(`${URI.baseURL}${URI.client}/all`, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error.message;
    }

    return throwError(errorMessage);
  }
}
