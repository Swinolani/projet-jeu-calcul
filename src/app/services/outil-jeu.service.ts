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
  mode$: BehaviorSubject<String | null> = new BehaviorSubject<String | null>(
    null
  );
}
