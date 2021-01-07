import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../Interfaces/User";
import * as fromActions from './login.actions';

export interface State {
    token:string,
    user:User,
    authError:string
}

export interface AppState {
    userLogin:State
}

const initialState: State = {
    token:null,
    user:null,
    authError:null
}

export function LoginReducer(state=initialState,action:fromActions.LoginTypes) {
    switch(action.type){
        case fromActions.LOGIN_START:
            return {
                ...state,
                authError:null
            }
        case fromActions.LOGIN_SUCCESS:
            const user:User = {
                username:action.payload.user.username,
                email:action.payload.user.email,
                id:action.payload.user.id,
                nickName:action.payload.user.nickName,
                about:action.payload.user.about
            }
            return {
                ...state,
                user:user,
                token:action.payload.token,
                authError:null
            }
        case fromActions.LOGIN_FAIL:
                return {
                    ...state,
                    authError:action.payload
                }
        case fromActions.LOGOUT:
            return {
                ...state,
                user:null,
                authError:null
            }

        default:
            return state;
    }
}

