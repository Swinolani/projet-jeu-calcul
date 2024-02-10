import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { OutilJeuService } from '../services/outil-jeu.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  template: `
    <div class="toplogin">
      <h1 class="logintext">Connexion</h1>
    </div>
    <div class="login">
      <form
        class="logincontainer"
        #connexion="ngForm"
        (ngSubmit)="envoyer(connexion, $event)"
      >
        <input
          [style.borderColor]="!estValidemailAttribute ? 'red' : ''"
          type="mail"
          name="mail"
          placeholder="adresse mail"
          [(ngModel)]="mail"
        />
        <input
          [style.borderColor]="!estValidePasswordAttribute ? 'red' : ''"
          type="password"
          name="password"
          placeholder="Mot de passe"
          [(ngModel)]="password"
        />
        <input type="submit" class="loginbutton" value="Se connecter" />
      </form>

      <a routerLink="/login/inscription" class="link-insc-conn"
        >Inscrivez vous ici</a
      >
      <a href="" class="link-insc-conn">Mot de passe oublié</a>
      @if (errorMessage!="") {
      <strong class="error">{{ errorMessage }}</strong>
      }
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

.login input[type="mail"],
.login input[type="password"] {
  background: #fff;
  border-color: #bbb;
  color: #555;
  margin:30px auto;
}

/* Text fields' focus effect */
.login input[type="mail"]:focus,
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
}
.error{
  display:block;
  text-align:center;
  width:60%;
  margin:0 auto;
  padding:5px 0;
  color:red;
}
`,
})
export class ConnexionComponent implements OnDestroy {
  mail: string = '';
  password: string = '';
  subscription: Subscription = new Subscription();
  errorMessage: string = '';

  estValidemailAttribute: boolean = true;
  estValidePasswordAttribute: boolean = true;
  url: string = 'http://localhost:8080/connexion';
  constructor(
    private http: HttpClient,
    private router: Router,
    private outil: OutilJeuService
  ) {}

  envoyer(elem: NgForm, $event: MouseEvent) {
    let mailValide = this.outil.mailValide.test(this.mail);
    this.estValidemailAttribute = mailValide;
    let passwordValide = this.outil.mdpValide.test(this.password);
    this.estValidePasswordAttribute = passwordValide;

    if (!mailValide || !passwordValide) {
      $event.preventDefault();
    } else {
      this.subscription.add(
        this.http
          .post(this.url, elem.value, {
            observe: 'response',
            responseType: 'text',
          })
          .subscribe({
            next: () => {
              this.router.navigate(['accueil']);
            },
            error: () => {
              this.errorMessage = `Addresse mail inexistante, veuillez vous inscrire`;
            },
          })
      );
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
