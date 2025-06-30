import { AbstractControl } from '@angular/forms';

export const identityRevealedValidator = (control: AbstractControl) => {
  const name = control.get('name');
  const alterEgo = control.get('alterEgo');
  return name && alterEgo && name.value === alterEgo.value
    ? { identityRevealed: true }
    : null;
};
