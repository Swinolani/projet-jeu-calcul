import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <a routerLink="/accueil">Accueil</a>
      <a routerLink="/classement">Classement</a>
      <a routerLink="/infos">Informations</a>
      <a routerLink="/login/connexion">Se connecter</a>
    </nav>
  `,
  styles: `nav {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px;
    margin: 5rem auto;
  }
  a {
    text-decoration: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    color: black;
    font-size: 1.8rem;
    font-weight: bold;
    text-align:center;
  }
  a:hover {
    background-color: rgba(255, 255, 255, 0.212);
    transition: 0.5s;
    cursor: pointer;
  }`,
})
export class NavComponent {}
