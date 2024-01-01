import { ApplicationConfig } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { OutilJeuService } from './services/outil-jeu.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), OutilJeuService, RouterModule],
};
