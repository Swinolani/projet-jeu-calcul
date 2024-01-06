import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { OutilJeuService } from '../services/outil-jeu.service';
import { Router } from '@angular/router';

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
        {{ nombreRandom1
        }}{{ operateurRandom != undefined ? operateurRandom : '??'
        }}{{ nombreRandom2 }}=<input
          type="text"
          name="result"
          id="result"
          maxlength="4"
          checked
          #resultat
          (keypress)="gestionCalcul(resultat.value, $event)"
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
  // Relatif au chrono
  compteur: number = 3;
  minute: number = 3;
  seconde: number = 0;
  ms: number = 0;

  constructor(private outil: OutilJeuService, private router: Router) {}

  //Relatif au calcul
  nombreRandom1: number = this.outil.nombre_1_a_100();
  nombreRandom2: number = this.outil.nombre_1_a_100();
  tableauOperateur: Array<String>;
  operateurRandom: String;
  regexChiffre: RegExp = new RegExp(/^[0-9]$/);
  // Gestion du calcul avec récuperation du mode dedans
  gestionCalcul(valeur: string, event: KeyboardEvent) {
    // Forcer l'entrée des chiffres
    if (!event.key.match(this.regexChiffre)) {
      event.preventDefault();
    }
    if (event.key == 'Enter') {
      switch (this.operateurRandom) {
        case '+':
          if (this.nombreRandom1 + this.nombreRandom2 == parseInt(valeur)) {
            console.log('correct !'); // A MODIFIER
          } else {
            console.log('incorrect !'); // A MODIFIER
          }
          this.nombreRandom1 = this.outil.nombre_1_a_100();
          this.nombreRandom2 = this.outil.nombre_1_a_100();
          this.operateurRandom = this.outil.operateur_random(
            this.tableauOperateur
          );
          break;
        case '-':
          if (this.nombreRandom1 - this.nombreRandom2 == parseInt(valeur)) {
            console.log('correct !'); // A MODIFIER
          } else {
            console.log('incorrect !'); // A MODIFIER
          }
          this.nombreRandom1 = this.outil.nombre_1_a_100();
          this.nombreRandom2 = this.outil.nombre_1_a_100();
          this.operateurRandom = this.outil.operateur_random(
            this.tableauOperateur
          );
          break;
        case '×':
          if (this.nombreRandom1 * this.nombreRandom2 == parseInt(valeur)) {
            console.log('correct !'); // A MODIFIER
          } else {
            console.log('incorrect !'); // A MODIFIER
          }
          this.nombreRandom1 = this.outil.nombre_1_a_100();
          this.nombreRandom2 = this.outil.nombre_1_a_100();
          this.operateurRandom = this.outil.operateur_random(
            this.tableauOperateur
          );
          break;
        default:
          this.router.navigate(['accueil']);
          break;
      }

      this.resultat.nativeElement.value = '';
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
        switch (this.outil.mode$.getValue()) {
          case 'tout-operation':
            this.tableauOperateur = ['+', '-', '×'];
            this.operateurRandom = this.outil.operateur_random(
              this.tableauOperateur
            );
            break;
          case 'addition-multiplication':
            this.tableauOperateur = ['+', '×'];
            this.operateurRandom = this.outil.operateur_random(
              this.tableauOperateur
            );
            break;
          case 'addition-soustraction':
            this.tableauOperateur = ['+', '-'];
            this.operateurRandom = this.outil.operateur_random(
              this.tableauOperateur
            );
            break;
          case 'multiplication':
            this.tableauOperateur = ['×'];
            this.operateurRandom = this.outil.operateur_random(
              this.tableauOperateur
            );
            break;
          case 'addition':
            this.tableauOperateur = ['+'];
            this.operateurRandom = this.outil.operateur_random(
              this.tableauOperateur
            );
            break;
          case 'soustraction':
            this.tableauOperateur = ['-'];
            this.operateurRandom = this.outil.operateur_random(
              this.tableauOperateur
            );
            break;
        }

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
          // Sous les 10 secondes, le chrono est rouge !
          if (this.minute == 0 && this.seconde == 10 && this.ms == 0) {
            this.chrono.nativeElement.style.color = 'red';
          }
        }, 10);
      }
    }, 1000);
  }
}
