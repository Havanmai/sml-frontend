import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService, Constants, Utils } from 'common';
import { HardwareStatus } from '../../hardware-status.model';
import { LockerStatus } from '../../locker-status.model';
import { LockerStatusService } from '../../locker-status.service';

@Component({
  selector: 'cms-detail-hardwarestatus',
  templateUrl: './detail-hardwarestatus.component.html',
  styleUrls: ['./detail-hardwarestatus.component.less'],
})
export class DetailHardwarestatusComponent implements OnInit {
  id: number;
  @Input() Cabinet: LockerStatus;
  @Input() hardwareStatus: HardwareStatus;

  constructor() {}

  ngOnInit(): void {}

  coppySecret(secret: string) {
    Utils.copyToClipboard(secret);
  }
}
