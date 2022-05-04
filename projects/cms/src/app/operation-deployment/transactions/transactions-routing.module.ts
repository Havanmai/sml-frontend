import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailTransactionComponent } from './detail-transaction/detail-transaction.component';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    data: {
      shouldDetach: true,
    },
  },
  {
    path: 'detail/:id',
    component: DetailTransactionComponent,
    data: {
      shouldDetach: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
