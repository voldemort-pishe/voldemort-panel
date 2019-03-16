import {
  ActionReducerMap,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AuthState } from './auth/auth.models';
import { authReducer } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  router: routerReducer
};


export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export interface AppState {
  auth: AuthState;
  router: RouterReducerState<RouterStateUrl>;
}
