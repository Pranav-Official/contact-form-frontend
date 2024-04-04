import { Routes } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { authGuardGuard } from './auth-guard.guard';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: ContactFormComponent,
  },
  {
    path: 'contact-form',
    component: ContactFormComponent,
  },
  {
    path: 'messages',
    component: MessageListComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
