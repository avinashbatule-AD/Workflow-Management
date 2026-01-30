import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { CreateWorkflowComponent } from './create-workflow/create-workflow.component';
import { EditWorkflowComponent } from './edit-workflow/edit-workflow.component';

import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: WorkflowListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateWorkflowComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'User'] }
  },
  {
    path: 'edit/:id',
    component: EditWorkflowComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'Manager'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowsRoutingModule {}
