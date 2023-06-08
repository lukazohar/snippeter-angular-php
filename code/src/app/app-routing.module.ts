import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SnippetsComponent } from './components/snippets/snippets.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'generator',
    component: GeneratorComponent
  },
  {
    path: 'snippets',
    component: SnippetsComponent
  },
  {
    path: 'snippets/:id',
    component: GeneratorComponent
  },
  {
    path: '',
    component: GeneratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
