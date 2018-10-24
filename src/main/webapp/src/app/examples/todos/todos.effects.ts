import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { ActionTodosPersist, TodosActionTypes } from './todos.actions';
import {LocalStorageService} from 'ngx-webstorage';

export const TODOS_KEY = 'EXAMPLES.TODOS';

@Injectable()
export class TodosEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService
  ) {}

  @Effect({ dispatch: false })
  persistTodos = this.actions$.pipe(
    ofType<ActionTodosPersist>(TodosActionTypes.PERSIST),
    tap(action =>
      this.localStorageService.store(TODOS_KEY, action.payload.todos)
    )
  );
}
