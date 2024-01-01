import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OutilJeuService {
  nombre_1_a_100(): Number {
    return Math.floor(Math.random() * 100);
  }
  constructor() {}
}
