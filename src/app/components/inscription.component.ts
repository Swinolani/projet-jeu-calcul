import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [RouterModule, FormsModule],
  template: `
    <div class="toplogin">
      <h1 class="logintext">Inscription</h1>
    </div>
    <div class="login">
      <form
        class="logincontainer"
        #inscription="ngForm"
        (ngSubmit)="envoyer(inscription)"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          [(ngModel)]="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          [(ngModel)]="password"
        />
        <input type="password" placeholder="Confirmer le mot de passe" />
        <input
          type="text"
          name="pseudo"
          placeholder="Pseudonyme"
          [(ngModel)]="pseudo"
        />
        <input type="submit" class="loginbutton" value="S'inscrire" />
      </form>
      <a routerLink="/login/connexion" class="link-insc-conn"
        >Déjà un compte ? Connectez vous ici</a
      >
      <a href="" class="link-insc-conn">Mot de passe oublié</a>
    </div>
  `,
  styles: `
  .login {
  background: antiquewhite;
  width: 500px;
  
  margin:0 auto;
  border-bottom-left-radius:20px;
  border-bottom-right-radius:20px;
}

.toplogin {
  border-top-left-radius:20px;
  border-top-right-radius:20px;
  background: #0099FF;
  width: 500px;
  height: 100px;
  text-align: center;
  margin:0 auto;
}

.logintext {
  font-family: Sans-serif;
  padding: 32px;
  font-size: 40px;
  text-transform: uppercase;
}
.logincontainer {
  padding: 20px;
}
.login input {
  box-sizing: border-box;
  display: block;
  width: 90%;
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  outline: 0;
  font-family: Sans-serif;
  font-size: 0.95em;
}

.login input[type="email"],
.login input[type="password"],
.login input[type="text"] {
  background: #fff;
  border-color: #bbb;
  color: #555;
  margin:30px auto;
}

/* Text fields' focus effect */
.login input[type="email"]:focus,
.login input[type="password"]:focus,
.login input[type="text"]:focus {
  border-color: #888;
}
.loginbutton {
  display:block;
    padding: 1rem 3rem;
    font-size: 1.4rem;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    background-color: rgb(1, 207, 80);
    font-weight: bold;
    margin:0 auto;
}
.loginbutton:hover {
  background-color: rgb(17, 216, 93);
}
.link-insc-conn{
  display:inline-block;
  padding:15px;
}`,
})
export class InscriptionComponent {
  email: String = '';
  password: String = '';
  pseudo: String = '';
  envoyer(elem: NgForm) {
    console.log(elem.value);
  }
}
