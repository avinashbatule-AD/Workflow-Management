import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { WorkflowService } from '../workflow.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Workflow } from '../workflow.model';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.component.html'
})
export class CreateWorkflowComponent implements OnInit {
  workflowForm: FormGroup;
  editing = false;
  workflowId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: WorkflowService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.workflowForm = this.fb.group({
      name: ['', [Validators.required], [this.nameUniqueValidator()]],
      priority: ['Medium', Validators.required],
      status: ['Draft', Validators.required],
      assignedUsers: [[], Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.workflowId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.workflowId) {
      this.editing = true;
      this.service.getWorkflows().subscribe(list => {
        const wf = list.find(w => w.id === this.workflowId);
        if (wf) this.workflowForm.patchValue(wf);
      });
    }
  }

  onSubmit() {
    const workflow: Workflow = { id: this.workflowId || Date.now(), ...this.workflowForm.value };
    if (this.editing) this.service.updateWorkflow(workflow);
    else this.service.addWorkflow(workflow);
    this.router.navigate(['/workflows']);
  }

  nameUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.service.getWorkflows().pipe(
        delay(300), // simulate server delay
        map(list => (list.some(w => w.name === control.value) ? { nameTaken: true } : null))
      );
    };
  }
}
