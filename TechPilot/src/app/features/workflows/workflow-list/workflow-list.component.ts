import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../workflow.service';
import { Workflow } from '../workflow.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html'
})
export class WorkflowListComponent {
  workflows$: Observable<Workflow[]>;

  constructor(private service: WorkflowService) {
    this.workflows$ = this.service.getWorkflows();
  }

  trackById(index: number, wf: any): number {
    return wf.id;
  }
  deleteWorkflow(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.service.deleteWorkflow(id);
    }
  }
}
