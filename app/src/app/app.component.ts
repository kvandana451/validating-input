import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroFormComponent } from './components/hero-form/hero-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';
}
