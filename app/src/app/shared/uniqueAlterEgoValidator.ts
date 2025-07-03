import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

export class uniqueAlterEgoValidator implements AsyncValidator {
  // function validate is from interface AsyncValidator
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.heroesService.isAlterEgoTaken(control.value).pipe(
      map((isTaken) => (isTaken ? { uniqueAlterEgo: true } : null)),
      catchError(() => of(null))
    );
  }
}

// You don’t see subscribe() because Angular calls it internally when running ASYNC VALIDATION — you just return the observable.

// returnedObservable.subscribe(result => {
// Angular uses this result to set validation status
// });
