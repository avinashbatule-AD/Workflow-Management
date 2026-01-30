import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Example shared components, pipes, directives
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule],
  exports: [ConfirmDialogComponent, CommonModule]
})
export class SharedModule { }
