import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IUsuario } from '../models/usuario';
import { URI } from '../config/uri';
import { IAuth } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string = '';

  constructor(private http: HttpClient) {}

  public get token(): string {
    return this._token;
  }
  public set token(value: string) {
    sessionStorage.setItem('token', value);
    this._token = value;
  }

  login(usuario: IUsuario): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${URI.baseURL}${URI.auth}`, usuario)
      .pipe(catchError(this.handleError));
  }

  validate(): Observable<IAuth> {
    this._token = sessionStorage.getItem('token') ?? '';
    return this.http.get<IAuth>(`${URI.baseURL}${URI.auth}`, {
      headers: { 'x-access-token': this._token },
    });
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
