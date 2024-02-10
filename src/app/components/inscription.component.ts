import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OutilJeuService } from '../services/outil-jeu.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  template: `
    <div class="toplogin">
      <h1 class="logintext">Inscription</h1>
    </div>
    <div class="login">
      <form
        class="logincontainer"
        #inscription="ngForm"
        (ngSubmit)="envoyer(inscription, $event)"
      >
        <input
          [style.borderColor]="!estValideMailAttribute ? 'red' : ''"
          type="email"
          name="useMail"
          placeholder="Email"
          [(ngModel)]="email"
        />
        <input
          [style.borderColor]="!estPasswordValidAttribute ? 'red' : ''"
          type="password"
          name="usePassword"
          placeholder="Mot de passe"
          [(ngModel)]="password"
        />
        <input
          [style.borderColor]="password != mdpConfirm.value ? 'red' : ''"
          type="password"
          placeholder="Confirmer le mot de passe"
          #mdpConfirm
        />
        <input
          [style.borderColor]="!estPseudoValideAttribute ? 'red' : ''"
          type="text"
          name="usePseudo"
          placeholder="Pseudonyme"
          [(ngModel)]="pseudo"
        />
        <input type="submit" class="loginbutton" value="S'inscrire" />
      </form>
      <a routerLink="/login/connexion" class="link-insc-conn"
        >Déjà un compte ? Connectez vous ici</a
      >
      @if (errorMessage!="") {
      <strong class="error">{{ errorMessage }}</strong>
      }
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
  padding:0 10px 10px;
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
export class InscriptionComponent implements OnDestroy {
  @ViewChild('mdpConfirm') mdpConfirm: ElementRef<HTMLInputElement>;

  email: string = '';
  password: string = '';
  pseudo: string = '';
  errorMessage: string = '';

  estValideMailAttribute: boolean = true;
  estPasswordValidAttribute: boolean = true;
  estPseudoValideAttribute: boolean = true;

  constructor(
    private router: Router,
    private http: HttpClient,
    private outil: OutilJeuService
  ) {}
  url: string = 'http://localhost:8080/inscription';
  subscription: Subscription = new Subscription();
  envoyer(elem: NgForm, $event: MouseEvent) {
    let estValideMail = this.outil.mailValide.test(this.email);
    this.estValideMailAttribute = estValideMail;
    let estPasswordValide = this.outil.mdpValide.test(this.password);
    this.estPasswordValidAttribute = estPasswordValide;
    let estPseudoValide = this.outil.pseudoValide.test(this.pseudo);
    this.estPseudoValideAttribute = estPseudoValide;
    if (
      !estValideMail ||
      !estPasswordValide ||
      !estPseudoValide ||
      this.password !== this.mdpConfirm.nativeElement.value
    ) {
      $event.preventDefault();
    } else {
      this.subscription.add(
        this.http
          .post(this.url, elem.value, {
            observe: 'response',
            responseType: 'text',
            withCredentials: true,
          })
          .subscribe({
            next: (reponse) => {
              console.log(reponse);

              this.router.navigate(['accueil']);
            },
            error: () => {
              this.errorMessage = `Ce compte existe déjà, connectez vous sinon`;
            },
          })
      );
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
