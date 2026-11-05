import { Routes } from '@angular/router';

import { ActivitiesList } from './components/activities-list/activities-list';
import { ActivityForm } from './components/activity-form/activity-form';
import { Chat } from './components/chat/chat';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { ReportsList } from './components/reports-list/reports-list';
import { ReportForm } from './components/report-form/report-form';
import { Register } from './components/register/register';
import { UserForm } from './components/user-form/user-form';
import { UsersList } from './components/users-list/users-list';
import { AuditsList } from './components/audits-list/audits-list';       // Importem llistat d'auditories
import { AuditDetail } from './components/audit-detail/audit-detail';   // Importem detall d'auditoria
import { activityPublisherGuard, adminGuard, authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuard], title: 'Inici' },
  { path: 'login', component: Login, canActivate: [guestGuard], title: 'Iniciar sessió' },
  { path: 'register', component: Register, canActivate: [guestGuard], title: 'Crear compte' },
  { path: 'users', component: UsersList, canActivate: [authGuard, adminGuard], title: 'Usuaris' },
  {
    path: 'users/new',
    component: UserForm,
    canActivate: [authGuard, adminGuard],
    title: 'Nou usuari',
  },
  {
    path: 'users/:id/edit',
    component: UserForm,
    canActivate: [authGuard, adminGuard],
    title: 'Editar usuari',
  },
  {
    path: 'activities',
    component: ActivitiesList,
    canActivate: [authGuard],
    title: 'Activitats',
  },
  {
    path: 'activities/new',
    component: ActivityForm,
    canActivate: [authGuard, activityPublisherGuard], 
    title: 'Nova activitat',
  },
  {
    path: 'activities/:id/edit',
    component: ActivityForm,
    canActivate: [authGuard, adminGuard],
    title: 'Editar activitat',
  },
  {
    path: 'reports',
    component: ReportsList,
    canActivate: [authGuard, adminGuard],
    title: 'Rèpords',
  },
  {
    path: 'reports/new',
    component: ReportForm,
    canActivate: [authGuard],
    title: 'Nou report',
  },
  {
    path: 'reports/:id/edit',
    component: ReportForm,
    canActivate: [authGuard, adminGuard],
    title: 'Revisar report',
  },
  
  //Afegim les rutes d'auditoria 
  {
    path: 'audits',
    component: AuditsList,
    canActivate: [authGuard, adminGuard], // Només l'admin pot veure l'auditoria
    title: 'Registre d\'Auditoria',
  },
  {
    path: 'audits/:id',
    component: AuditDetail,
    canActivate: [authGuard, adminGuard], // Només l'admin pot veure el detall i revertir
    title: 'Detall d\'Auditoria',
  },
  
  { path: 'chat', component: Chat, canActivate: [authGuard], title: 'Xat' },
  { path: '**', redirectTo: '' },
];
