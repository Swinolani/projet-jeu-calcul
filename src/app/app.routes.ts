import { Routes } from '@angular/router';
import { AccueilComponent } from './views/accueil.component';
import { CalculComponent } from './views/calcul.component';
import { ClassementComponent } from './views/classement.component';
import { LogComponent } from './views/log.component';
import { ConnexionComponent } from './components/connexion.component';
import { InscriptionComponent } from './components/inscription.component';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'calcul', component: CalculComponent },
  { path: 'classement', component: ClassementComponent },
  {
    path: 'login',
    component: LogComponent,
    children: [
      {
        path: 'connexion',
        component: ConnexionComponent,
      },
      { path: 'inscription', component: InscriptionComponent },
    ],
  },
];
