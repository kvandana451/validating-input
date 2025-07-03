import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

// DATA
// when the data won’t change and you want to keep the service cleaner.
//  const alter_egos = ['Eric']; // Outside the class

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  // DATA
  // data might change later.(real timeapis and so on...)
  alter_egos = ['Eric'];

  constructor() {}
  isAlterEgoTaken(alterEgo: string): Observable<boolean> {
    const isTaken = this.alter_egos.includes(alterEgo);
    return of(isTaken).pipe(delay(400));
  }
}
