import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../core/guards/auth.guard';  // Protects route

// Define the routes for the Dashboard
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,  // Component to be displayed
    canActivate: [AuthGuard],  // Protects the dashboard from unauthenticated access
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Use forChild for feature modules
  exports: [RouterModule]  // Export RouterModule so that it can be used in other modules
})
export class DashboardRoutingModule {}
