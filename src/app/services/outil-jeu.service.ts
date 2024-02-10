import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OutilJeuService {
  nombre_1_a_100(): number {
    return Math.floor(Math.random() * 100);
  }
  operateur_random(tableau: Array<String>): String {
    return tableau[Math.floor(Math.random() * tableau.length)];
  }
  mailValide: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  mdpValide: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
  pseudoValide: RegExp = /^[a-zA-Z0-9-]{4,}$/;
  mode$: BehaviorSubject<String> = new BehaviorSubject<String>('');
}
