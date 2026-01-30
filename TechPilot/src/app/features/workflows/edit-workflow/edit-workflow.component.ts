import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from '../workflow.service';
import { Workflow } from '../workflow.model';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-workflow',
  templateUrl: './edit-workflow.component.html',
})
export class EditWorkflowComponent implements OnInit {
  workflowForm: FormGroup;
  workflowId!: number;
  workflow!: Workflow;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private service: WorkflowService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.workflowForm = this.fb.group({
      name: ['', [Validators.required], [this.nameUniqueValidator()]],
      priority: ['Medium', Validators.required],
      status: ['Draft', Validators.required],
      assignedUsers: [[], Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.workflowId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getWorkflows().subscribe(list => {
      const wf = list.find(w => w.id === this.workflowId);
      if (wf) {
        this.workflow = wf;
        this.workflowForm.patchValue({
          name: wf.name,
          priority: wf.priority,
          status: wf.status,
          assignedUsers: wf.assignedUsers.join(', '),
          dueDate: this.formatDate(wf.dueDate)
        });
      }
      this.loading = false;
    });
  }

  // Convert date to yyyy-MM-dd format for input[type=date]
  formatDate(date: string | Date): string {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.workflowForm.invalid) return;

    const formValue = this.workflowForm.value;
    const updatedWorkflow: Workflow = {
      id: this.workflow.id,
      name: formValue.name,
      priority: formValue.priority,
      status: formValue.status,
      assignedUsers: formValue.assignedUsers.split(',').map((u: string) => u.trim()),
      dueDate: new Date(formValue.dueDate)
    };

    this.service.updateWorkflow(updatedWorkflow);
    this.router.navigate(['/workflows']);
  }

  // Async validator to ensure workflow name is unique (excluding current workflow)
  nameUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.service.getWorkflows().pipe(
        delay(300), // simulate server delay
        map(list => {
          const duplicate = list.some(
            w => w.name === control.value && w.id !== this.workflowId
          );
          return duplicate ? { nameTaken: true } : null;
        })
      );
    };
  }
}
