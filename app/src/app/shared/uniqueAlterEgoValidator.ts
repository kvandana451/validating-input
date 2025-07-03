import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HeroesService } from '../../../services/heroes.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class uniqueAlterEgoValidator implements AsyncValidator {
  // function validate is from interface AsyncValidator
  constructor(private heroesService: HeroesService) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    // console.log(
    //   this.heroesService
    //     .isAlterEgoTaken(control.value)
    //     .pipe(map((isTaken) => (isTaken ? { uniqueAlterEgo: true } : null)))
    //     .subscribe((res: any) => {
    //       console.log(25, res);
    //     })
    // );
    return this.heroesService.isAlterEgoTaken(control.value).pipe(
      tap((val) => console.log('Service response', val, typeof val)),
      map((isTaken) => (isTaken ? { uniqueAlterEgo: true } : null)),
      catchError(() => of(null))
    );
  }
}

// You don’t see subscribe() because Angular calls it internally when running ASYNC VALIDATION — you just return the observable.

// returnedObservable.subscribe(result => {
// Angular uses this result to set validation status
// });
