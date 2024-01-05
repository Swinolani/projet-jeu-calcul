import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calcul',
  standalone: true,
  imports: [],
  template: `
    <div #chrono class="chrono">
      0{{ minute }}:{{ seconde < 10 ? '0' : '' }}{{ seconde }}:{{
        ms < 10 ? '0' : ''
      }}{{ ms }}
    </div>
    <p #text class="text">A vos claviers ! Vous avez 3 minutes !</p>
    <div #jeuCalcul class="calcul">
      <div class="elemCalcul">
        25+35=<input
          type="text"
          name="result"
          id="result"
          maxlength="4"
          checked
          #resultat
          (keyup)="gestionCalcul(resultat.value, $event)"
        />
      </div>
    </div>
    <div #decompteur class="container">{{ compteur }}</div>
  `,
  styles: `
  /* ZONE TEXT + CHRONO */ 
  .chrono{
    position: absolute;
    right:5%;
    top:50px;
    font-size:5rem;
    border:1px solid black;
    padding:5px;
    background-color:#f0eedf;
    box-shadow:2px 2px 5px rgb(0,0,0,0.4);
    border-radius:10px;
    width:310px;
  }
  .text{
    position:absolute;
    left:25%;
    right:25%;
    top:200px;
    text-align:center;
    margin:0 auto;
    font-size:3rem;
    font-weight:bold;
    color:red;
  }
  /* ZONE CALCUL */
  .calcul{
    font-size:12rem;
    position:absolute;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
    width:100%;
    user-select:none;
  }
  #result{
    font-size:12rem;
    display:inline-block;
    width:27rem;
    outline:none;
    background-color:rgb(0,0,0,0);
    border:1px solid black;
  }
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
    user-select:none;
  }
  `,
})
export class CalculComponent implements AfterViewInit {
  //attribut template
  @ViewChild('decompteur') private decompteur: ElementRef<HTMLDivElement>;
  @ViewChild('jeuCalcul') private jeuCalcul: ElementRef<HTMLDivElement>;
  @ViewChild('resultat') private resultat: ElementRef<HTMLInputElement>;
  @ViewChild('chrono') private chrono: ElementRef<HTMLDivElement>;
  @ViewChild('text') private text: ElementRef<HTMLParagraphElement>;

  //Autres attribut
  compteur: number = 3;
  minute: number = 3;
  seconde: number = 0;
  ms: number = 0;
  // Gestion du calcul avec récuperation du mode dedans
  gestionCalcul(valeur: String, event: KeyboardEvent) {
    if (event.key == 'Enter') {
      // Code du calcul ici
    }
  }
  // Le code pour le fonctionnel du jeu avec les methodes ici !
  ngAfterViewInit(): void {
    this.jeuCalcul.nativeElement.style.display = 'none';
    this.chrono.nativeElement.style.display = 'none';
    this.text.nativeElement.style.display = 'none';
    // Decompteur avant le jeu
    const decompteur = setInterval(() => {
      if (this.compteur != 0) {
        this.compteur--;
      } else {
        clearInterval(decompteur);
        this.decompteur.nativeElement.style.display = 'none';
        this.chrono.nativeElement.style.display = '';
        this.text.nativeElement.style.display = '';
        this.jeuCalcul.nativeElement.style.display = '';
        this.resultat.nativeElement.focus();
        // Ici on recup le mode et on initie les nombre et l'operateur en fonction
        // Disparition du text
        setTimeout(() => {
          this.text.nativeElement.style.display = 'none';
        }, 2000);
        // Le minuteur
        const chrono = setInterval(() => {
          if (this.ms === 0) {
            if (this.seconde === 0) {
              if (this.minute === 0) {
                clearInterval(chrono);
                // Code pour cancel la possibilité d'entrer des réponse.
                // On disablera l'input et on enlevera le display du calcul
                return;
              }
              this.minute--;
              this.seconde = 59;
            } else {
              this.seconde--;
            }
            this.ms = 99;
          } else {
            this.ms--;
          }
          // Peut être colorier l'interface en fonction du compteur?
        }, 10);
      }
    }, 1000);
  }
}
