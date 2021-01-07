import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, map, switchMap } from "rxjs/operators";
import { User } from '../Interfaces/User';
import * as fromActions from '../RegistrationForm/login.actions'

export interface LoginResponse {
    user:User,
    token:string
}

@Injectable()
export class LoginEffects {
    @Effect()
    login = this.actions$.pipe(
        ofType(fromActions.LOGIN_START),
        switchMap((loginData:fromActions.LoginStart) => {
            return this.http.post<LoginResponse>('http://localhost:5000/api/auth/login', 
            {
                username: loginData.payload.username,
                password: loginData.payload.password,
            }).pipe(
                map(resdata => {
                    
                    return new fromActions.LoginSuccess({user:resdata.user,token:resdata.token})
                }),
                catchError(error => {
                    return of(new fromActions.LoginFail(error.error.title))
                })
            )
        })
    )


    constructor(private actions$:Actions,private http:HttpClient,private router:Router){}
}