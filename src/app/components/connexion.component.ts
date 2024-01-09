import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [RouterModule, FormsModule],
  template: `
    <div class="toplogin">
      <h1 class="logintext">Connexion</h1>
    </div>
    <div class="login">
      <form
        class="logincontainer"
        #connexion="ngForm"
        (ngSubmit)="envoyer(connexion)"
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
        <input type="submit" class="loginbutton" value="S'inscrire" />
      </form>

      <a routerLink="/login/inscription" class="link-insc-conn"
        >Inscrivez vous ici</a
      >
    </div>
  `,
  styles: `
  .login {
  background: antiquewhite;
  width: 500px;
  height: 400px;
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
.login input[type="password"] {
  background: #fff;
  border-color: #bbb;
  color: #555;
  margin:30px auto;
}

/* Text fields' focus effect */
.login input[type="email"]:focus,
.login input[type="password"]:focus {
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
export class ConnexionComponent {
  email: String = '';
  password: String = '';
  envoyer(elem: NgForm) {}
}
