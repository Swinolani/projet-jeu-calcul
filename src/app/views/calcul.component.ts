import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavComponent } from '../components/nav.component';

@Component({
  selector: 'app-calcul',
  standalone: true,
  imports: [],
  template: `
    <div #jeuCalcul class="calcul">
      <p>12x78=?</p>
    </div>
    <div #decompteur class="container">{{ compteur }}</div>
  `,
  styles: `
  /* CONTAINER */
  .container{
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:16rem;
    position:absolute;
    top:0;
    background-color:rgb(255,255,255,0.5);
    width:100%;
    height:100%;
  }
  `,
})
export class CalculComponent implements AfterViewInit {
  @ViewChild('decompteur') decompteur: ElementRef<HTMLDivElement>;
  @ViewChild('jeuCalcul') jeuCalcul: ElementRef<HTMLDivElement>;
  compteur: number = 3;
  // Le code pour le fonctionnel du jeu avec les methodes ici !
  ngAfterViewInit(): void {
    this.jeuCalcul.nativeElement.style.display = 'none';
    const chrono = setInterval(() => {
      if (this.compteur != 0) {
        this.compteur--;
      } else {
        clearInterval(chrono);
        this.decompteur.nativeElement.style.display = 'none';
        this.jeuCalcul.nativeElement.style.display = '';
        // Le minuteur doit être fait ici car asynchrone
        return;
      }
    }, 1000);
  }
}
