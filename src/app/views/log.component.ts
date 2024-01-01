import { Component } from '@angular/core';
import { NavComponent } from '../components/nav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-log',
  standalone: true,
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `,
  styles: ``,
  imports: [NavComponent, RouterModule],
})
export class LogComponent {}
