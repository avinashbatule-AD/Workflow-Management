import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { WorkflowService } from '../workflows/workflow.service';
import { Workflow } from '../workflows/workflow.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  workflows: Workflow[] = [];
  chart!: Chart;

  constructor(private workflowService: WorkflowService) {}

  ngOnInit(): void {
    this.workflowService.getWorkflows().subscribe(list => {
      this.workflows = list;
      this.drawChart();
    });
  }

  drawChart(): void {
    const labels = ['Draft', 'In Review', 'Approved', 'Rejected'];
    const data = labels.map(
      status => this.workflows.filter(w => w.status === status).length
    );

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Workflows',
            data,
            backgroundColor: '#42A5F5'
          }
        ]
      }
    });
  }

  get totalWorkflows(): number {
    return this.workflows.length;
  }

  get overdueWorkflows(): number {
    const today = new Date();
    return this.workflows.filter(
      w => new Date(w.dueDate) < today
    ).length;
  }
}

// import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { WorkflowService } from '../workflows/workflow.service';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';


// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class DashboardComponent implements OnInit {

//   totalWorkflows$!: Observable<number>;
//   overdueWorkflows$!: Observable<number>;
//   averageCompletionTime$!: Observable<number>;

//   constructor(private workflowService: WorkflowService) {}

//   ngOnInit(): void {
//     const workflows$ = this.workflowService.getWorkflows();

//     this.totalWorkflows$ = workflows$.pipe(map(wfs => wfs.length));

//     this.overdueWorkflows$ = workflows$.pipe(
//       map(wfs => wfs.filter(w => new Date(w.dueDate) < new Date()).length)
//     );

//     this.averageCompletionTime$ = workflows$.pipe(
//       map(wfs => {
//         const completed = wfs.filter(w => w.status === 'Approved');
//         if (!completed.length) return 0;
//         const totalTime = completed.reduce((acc, wf) => {
//           const start = new Date(wf.createdDate || wf.dueDate);
//           const end = new Date(wf.dueDate);
//           return acc + (end.getTime() - start.getTime());
//         }, 0);
//         return totalTime / completed.length / (1000 * 60 * 60 * 24); // in days
//       })
//     );
//   }
// }
