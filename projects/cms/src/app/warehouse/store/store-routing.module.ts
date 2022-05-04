import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWaybillsComponent } from './create-waybills/create-waybills.component';
import { ListDeviceModalComponent } from './create-waybills/list-device-modal/list-device-modal.component';
import { DetailDeviceComponent } from './detail-device/detail-device.component';
import { DetailTicketComponent } from './history-device/detail-ticket/detail-ticket.component';
import { HistoryDeviceComponent } from './history-device/history-device.component';
import { ImportDeviceComponent } from './import-device/import-device.component';
import { StoreComponent } from './store.component';

const routes: Routes = [
  { path: '', component: StoreComponent },

  {
    path: 'import-device',
    component: ImportDeviceComponent,
    data: { breadcrumb: 'Nhập hàng lẻ' },
  },
  {
    path: 'history-device',
    component: HistoryDeviceComponent,
    data: { breadcrumb: 'Lịch sử nhập xuất' },
  },
  {
    path: 'history-device/:id',
    component: DetailTicketComponent,
    data: { breadcrumb: 'Chi tiết phiếu' },
  },
  {
    path: 'detail-device',
    component: DetailDeviceComponent,
    data: { breadcrumb: 'Chi tiết thiết bị' },
  },
  {
    path: 'way-bills',
    component: CreateWaybillsComponent,
    data: { breadcrumb: 'Tạo phiếu' },
    pathMatch: 'prefix',
  },
  {
    path: 'list-device',
    component: ListDeviceModalComponent,
    data: { breadcrumb: 'Danh sách thiết bị' },
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
