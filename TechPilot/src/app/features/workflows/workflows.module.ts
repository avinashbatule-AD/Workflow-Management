import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { CreateWorkflowComponent } from './create-workflow/create-workflow.component';
import { EditWorkflowComponent } from './edit-workflow/edit-workflow.component';

import { WorkflowsRoutingModule } from './workflows-routing.module';

@NgModule({
  declarations: [
    WorkflowListComponent,
    CreateWorkflowComponent,
    EditWorkflowComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,   // ✅ REQUIRED for formGroup
    FormsModule,
    RouterModule,
    WorkflowsRoutingModule
  ]
})
export class WorkflowsModule {}
