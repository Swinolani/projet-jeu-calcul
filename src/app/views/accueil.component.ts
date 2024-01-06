import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavComponent } from '../components/nav.component';
import { FormsModule, NgForm } from '@angular/forms';
import { OutilJeuService } from '../services/outil-jeu.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  template: `
    <app-nav></app-nav>
    <section class="accueil">
      <div class="container animate__animated animate__zoomIn animate__faster">
        <h1>THE KING OF CALCULUS !</h1>
        <p>
          Un jeu de calcul mental avec divers niveaux de difficulté allant de
          simples additions à des multiplications de plusieurs chiffres !
          Resolvez un maximum de calcul et enregistrez vos performances dans le
          classement général en vous connectant !
        </p>
        <button (click)="parametre(paramCalcul)">Jouer</button>
      </div>
      <img src="./assets/calcul-mental-logo.png" alt="Logo calcul mental" />
    </section>
    <!-- template pour les paramètres avant le lancement du jeu  -->
    <section
      #paramCalcul
      style="display:none"
      (click)="fermer($event, paramCalcul)"
    >
      <div class="container-param">
        <h1>Mode de jeu</h1>
        <form #formParam="ngForm" (ngSubmit)="redirectCalcul(formParam)">
          <input
            [(ngModel)]="toutOperation"
            type="radio"
            name="mode"
            value="tout-operation"
            id="tout-operation"
          /><label for="tout-operation">Toutes les opérations</label><br />
          <input
            [(ngModel)]="additionMultiplication"
            type="radio"
            name="mode"
            value="addition-multiplication"
            id="addition-multiplication"
          /><label for="addition-multiplication"
            >Additions et multiplications</label
          ><br />
          <input
            [(ngModel)]="additionSoustraction"
            type="radio"
            name="mode"
            value="addition-soustraction"
            id="addition-soustraction"
          /><label for="addition-soustraction">Additions et soustractions</label
          ><br />
          <input
            [(ngModel)]="multiplication"
            type="radio"
            name="mode"
            value="multiplication"
            id="multiplication"
          /><label for="multiplication">Multiplications seulement</label><br />
          <input
            [(ngModel)]="addition"
            type="radio"
            name="mode"
            value="addition"
            id="addition"
          /><label for="addition">Additions seulement</label><br />
          <input
            [(ngModel)]="soustraction"
            type="radio"
            name="mode"
            value="soustraction"
            id="soustraction"
          /><label for="soustraction">Soustractions seulement</label><br />
          <input type="submit" value="Place au calcul !" id="go-calcul" />
        </form>
        @if (erreurBoutonCalculAvantJeu!="") {
        <p style="margin:0 auto;text-align:center;font-weight:bold;color:red">
          {{ erreurBoutonCalculAvantJeu }}
        </p>
        }
      </div>
    </section>
  `,
  styleUrl: '../../assets/css/accueil.component.css',
  imports: [NavComponent, FormsModule, RouterModule],
})
export class AccueilComponent {
  toutOperation: String;
  additionMultiplication: String;
  additionSoustraction: String;
  multiplication: String;
  addition: String;
  soustraction: String;

  erreurBoutonCalculAvantJeu: String | undefined;

  constructor(private router: Router, private outil: OutilJeuService) {}
  parametre(section: HTMLElement) {
    section.style.display = '';

    section.setAttribute(
      'class',
      'parametres-calcul animate__animated animate__fadeIn animate__faster'
    );
  }
  fermer($event: MouseEvent, section: HTMLElement) {
    if ($event.target === $event.currentTarget) {
      section.style.display = 'none';
    }
  }
  redirectCalcul(form: NgForm) {
    if (form.value.mode == undefined) {
      this.erreurBoutonCalculAvantJeu = 'Selectionnez un niveau !';
    } else {
      this.erreurBoutonCalculAvantJeu = '';
      this.outil.mode$.next(form.value.mode);
      this.router.navigate(['calcul']);
    }
  }
}
