import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { forbiddenNameValidator } from '../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../shared/identity-revealed.directive';
import { uniqueAlterEgoValidator } from '../../shared/uniqueAlterEgoValidator';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule, NgIf, JsonPipe, NgFor],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
})
export class HeroFormComponent {
  // heroForm?: FormGroup;
  // powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
  // hero = {
  //   name: 'Dr',
  //   alterEgo: 'Dr.What',
  //   power: this.powers[0],
  // };
  // get name() {
  //   // console.log(this.heroForm?.get('name'));
  //   return this.heroForm?.get('name');
  // }
  // get power() {
  //   return this.heroForm?.get('power');
  // }
  // forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const forbidden = nameRe.test(control.value);
  //     return forbidden ? { forbiddenName: { value: control.value } } : null;
  //   };
  // }
  // ngOnInit() {
  //   this.heroForm = new FormGroup({
  //     name: new FormControl(this.hero.name, [
  //       Validators.required,
  //       Validators.minLength(4),
  //       this.forbiddenNameValidator(/bob/i),
  //     ]),
  //     alterEgo: new FormControl(this.hero.alterEgo),
  //     power: new FormControl(this.hero.power, Validators.required),
  //   });
  // }

  heroForm?: FormGroup;
  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
  hero = {
    name: 'Dr..',
    alterEgo: 'Dr..',
    power: this.powers[0],
  };
  // GETTERS to access form controls
  get formControl_name() {
    return this.heroForm?.get('name');
  }
  get formControl_alterEgo() {
    return this.heroForm?.get('alterEgo');
  }
  get formControl_power() {
    return this.heroForm?.get('power');
  }
  constructor(private uniquealterEgoValidator: uniqueAlterEgoValidator) {}
  isSubmitted: boolean = false;
  onSubmitForm() {
    this.isSubmitted = true;
  }
  ngOnInit() {
    this.heroForm = new FormGroup(
      {
        name: new FormControl(this.hero.name, [
          Validators.required,
          Validators.minLength(4),
          forbiddenNameValidator(/bob/i), // <-- Here's how you pass in the custom validator.
        ]),
        alterEgo: new FormControl(this.hero.alterEgo, {
          asyncValidators: [
            this.uniquealterEgoValidator.validate.bind(
              this.uniquealterEgoValidator
            ),
          ],
          updateOn: 'blur',
        }),
        power: new FormControl(this.hero.power, Validators.required),
      },
      { validators: identityRevealedValidator }
    );
    console.log(this.heroForm.get('name')?.value);
    //IMPORTANT:Auto-reset isSubmitted when user edits the form again
    this.heroForm.valueChanges.subscribe(() => {
      if (this.isSubmitted) {
        this.isSubmitted = false; // auto-reset when form is changed
      }
    });
  }
}
