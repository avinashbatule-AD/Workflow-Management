import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)], // Use `forChild` to configure routes in a feature module
  exports: [RouterModule] // Export RouterModule so other modules can use the routing
})
export class AuthRoutingModule {}
