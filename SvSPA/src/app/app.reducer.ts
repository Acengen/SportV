import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUSerReducer from '../app/RegistrationForm/login.reducer'
export interface AppState {
    userLogin: fromUSerReducer.State
}

export const reducers:ActionReducerMap<AppState> = {
    userLogin: fromUSerReducer.LoginReducer
}

export const getLoginState = createFeatureSelector<fromUSerReducer.State>('userLogin');
export const getUser = createSelector(getLoginState,fromUSerReducer.getUser);