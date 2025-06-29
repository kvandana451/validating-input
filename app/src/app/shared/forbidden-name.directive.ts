import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Defining a custom validator
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  // Angular’s validator functions must always match this signature:(control: AbstractControl) => ValidationErrors | null
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(control.value);
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
