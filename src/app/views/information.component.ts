import { Component } from '@angular/core';
import { NavComponent } from '../components/nav.component';

@Component({
  selector: 'app-information',
  standalone: true,
  template: `
    <app-nav></app-nav>
    <div class="informations">
      <!-- Réalisé par BOULAABI Mohamed dans le cadre de la formation
      "<em>Concepteur développeur d'applications</em>"-->
      <h1>Informations</h1>
      <h2>Le jeu</h2>
      <p>
        Ce petit jeu consiste à réaliser le plus grand nombre de calcul possible
        en un temps record. Au lancement du jeu, vous aurez un décompte, temps
        necessaire pour bien vous préparer avant de vous retrouver devant une
        liste d'opérations à effectuer durant 3 minutes ! Vous aurez à la fin
        l'occasion d'enregistrer votre score pour partager vos performances et
        vous retrouver parmi les meilleurs !
      </p>
      <h2>Moi même</h2>
      <p>
        Réalisé par <em>BOULAABI Mohamed</em> dans le cadre de la formation "<em
          >Concepteur développeur d'applications</em
        >" chez M2i formation, j'aspire à être un futur développeur full stack
        en me spécialisant sur <strong>Angular</strong> côté front
        (éventuellement sur <strong>Svelte</strong> aussi) et sur
        <strong>Spring boot</strong> en back. Je peux cependant être très
        flexible côté front niveau outil.
      </p>
      <!-- suite ici  -->
    </div>
  `,
  styles: `
  h1{
    text-decoration:underline;
  }
  .informations{
    width:60%;
    margin:0 auto;
    background-color:antiquewhite;
    padding:10px;
    border-radius:20px;
  }
    p {
  display: block;
  font-size: 1.5rem;
}
  `,
  imports: [NavComponent],
})
export class InformationComponent {}
