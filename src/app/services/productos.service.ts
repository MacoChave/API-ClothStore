import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { URI } from '../config/uri';
import { IMessage } from '../models/message';
import { IProducto } from '../models/producto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  create(producto: IProducto): Observable<IMessage> {
    return this.http
      .post<IMessage>(`${URI.baseURL}${URI.product}`, producto, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  update(producto: IProducto): Observable<IMessage> {
    return this.http
      .put<IMessage>(`${URI.baseURL}${URI.product}`, producto, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<IProducto> {
    return this.http
      .get<IProducto>(`${URI.baseURL}${URI.product}/one/${id}`, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  getAll(): Observable<IProducto[]> {
    return this.http
      .get<IProducto[]>(`${URI.baseURL}${URI.product}/all`, {
        headers: { 'x-access-token': this.authService.token },
      })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) errorMessage = error.error.message;
    else errorMessage = error.error.message;

    return throwError(errorMessage);
  }
}
