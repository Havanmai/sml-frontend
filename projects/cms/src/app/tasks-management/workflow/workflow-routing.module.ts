import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowComponent } from './workflow.component';
import { DetailWorkflowComponent } from './detail-workflow/detail-workflow.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowComponent,
  },
  {
    path: 'detail',
    component: DetailWorkflowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowRoutingModule {}
