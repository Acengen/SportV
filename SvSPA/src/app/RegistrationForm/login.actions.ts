import { Action } from "@ngrx/store";
import { User } from "../Interfaces/User";

export const LOGIN_START = '[Login] LoginStart';
export const LOGIN_SUCCESS = "[Login] LoginSuccess";
export const LOGIN_FAIL = "[Login] LoginFail";

export const LOGOUT = "[Login] Logout"


export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload:{username:string,password:string}) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload:{token:string,user:User}) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload:string) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;

}

export type LoginTypes = LoginStart | LoginSuccess | Logout | LoginFail;

