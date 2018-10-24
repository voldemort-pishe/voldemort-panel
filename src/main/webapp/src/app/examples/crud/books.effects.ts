import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import { State } from '../examples.state';
import { BookActionTypes } from './books.actions';
import { selectBooks } from './books.selectors';
import {LocalStorageService} from 'ngx-webstorage';

export const BOOKS_KEY = 'EXAMPLES.BOOKS';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions<Action>,
    private store: Store<State>,
    private localStorageService: LocalStorageService
  ) {}

  @Effect({ dispatch: false })
  persistBooks = this.actions$.pipe(
    ofType(BookActionTypes.UPSERT_ONE, BookActionTypes.DELETE_ONE),
    withLatestFrom(this.store.pipe(select(selectBooks))),
    tap(([actions, booksState]) =>
      this.localStorageService.store(BOOKS_KEY, booksState)
    )
  );
}
