import { Component } from '@angular/core';
import { NavComponent } from '../components/nav.component';

@Component({
  selector: 'app-information',
  standalone: true,
  template: `
    <app-nav></app-nav>
    <p>information works!</p>
    <!-- suite ici  -->
  `,
  styles: ``,
  imports: [NavComponent],
})
export class InformationComponent {}
