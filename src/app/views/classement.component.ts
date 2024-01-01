import { Component } from '@angular/core';
import { NavComponent } from '../components/nav.component';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-classement',
  standalone: true,
  template: `
    <app-nav></app-nav>
    <!-- Ici sur le long terme yaura un router outlet pour les catégories
    ex : classement/addition -->
    <form #filtre="ngForm" (ngSubmit)="filtrer()">
      <select name="filtre-classement" [(ngModel)]="valueTarget" id="filtre">
        <option value="tout-operation">Toutes les opérations</option>
        <option value="addition-multiplication">Addition&Multiplication</option>
        <option value="addition-soustraction">Addition&Soustraction</option>
        <option value="multiplication">Multiplication</option>
        <option value="addition">Addition</option>
        <option value="soustraction">Soustraction</option>
      </select>
      <input type="submit" value="Filtrer" />
    </form>
    <table class="classement">
      <tr class="ligne">
        <td>
          <div class="info numero">1</div>
          <div class="info pseudo">Swinolani</div>
          <div class="info resultat">25</div>
        </td>
      </tr>
      <tr class="ligne">
        <td>
          <div class="info numero">2</div>
          <div class="info pseudo">Swinolani</div>
          <div class="info resultat">25</div>
        </td>
      </tr>
      <tr class="ligne">
        <td>
          <div class="info numero">3</div>
          <div class="info pseudo">Swinolani</div>
          <div class="info resultat">25</div>
        </td>
      </tr>
      <tr class="ligne">
        <td>
          <div class="info numero">4</div>
          <div class="info pseudo">Swinolani</div>
          <div class="info resultat">25</div>
        </td>
      </tr>
      <tr class="ligne">
        <td>
          <div class="info numero">5</div>
          <div class="info pseudo">Swinolani</div>
          <div class="info resultat">25</div>
        </td>
      </tr>
    </table>
  `,
  styles: `
  .classement{
    margin:0 auto;
    width:60%;
   
  }
  td{
    display:flex;
    height:5rem;
    background-color:lightgrey;
    
  }
  .info{
    display:flex;
    align-items:center;
    font-size:2rem;
    font-weight:bold;
    background-color:white;
    
  }
  .info.pseudo,.info.resultat{
    background-color:#f2f1f1;

  }
  .numero{
    justify-content:center;
    
    width:10%;
    border-top-left-radius: 50px;
    border-bottom-right-radius:50px;
  }
  .pseudo{
    padding-left:1rem;
    
    width:80%;
  }
  
 
  .resultat{
    justify-content:center;
   
    width:10%;
  }
  `,
  imports: [NavComponent, FormsModule],
})
export class ClassementComponent {
  valueTarget: string = 'tout-operation';
  filtrer() {
    console.log(this.valueTarget); //Provisoire
  }
}
