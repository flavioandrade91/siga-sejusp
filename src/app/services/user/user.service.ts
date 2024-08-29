import { AuthResquest } from './../../models/interfaces/user/auth/AuthRequest';
import { Cookie } from './../../../../node_modules/@types/tough-cookie/index.d';
import { AuthResponse } from './../../models/interfaces/user/auth/AuthResponse';
import { SingUpUserResquest } from '../../models/interfaces/user/SignUpUserResquest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { SingUpUserResponse } from '../../models/interfaces/user/SignUpUserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = enviroment.API_URL;

  constructor(private http:HttpClient, private cookie: Cookie) { }

  signUpUser(requestDatas: SingUpUserResquest):Observable<SingUpUserResponse>{
    return this.http.post<SingUpUserResponse>(`${this.API_URL}/user`, requestDatas

    );
  }
  authUser(requestDatas: AuthResquest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`,requestDatas);
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }

}


