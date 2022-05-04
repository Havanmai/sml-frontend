import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'projects/cms/src/shared/services/state.service';
import * as _ from 'lodash';
@Component({
  selector: 'cms-detail-states',
  templateUrl: './detail-states.component.html',
  styleUrls: ['./detail-states.component.less'],
})
export class DetailStatesComponent implements OnInit {
  public lstUser = [];
  public iData: any = {};
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stateService: StateService
  ) {
    this.activatedRoute.paramMap.subscribe((data: any) => {
      if (data && data.params.id) {
        this.getDetailState(data.params.id);
      }
    });
  }

  /** LIFE CYCLE */
  ngOnInit(): void {}
  /** PUBLIC METHOD */
  public onEdit(data) {
    this.router.navigateByUrl('state/edit/' + data.id);
  }
  /** PRIVATE METHOD */
  private getDetailState(id) {
    this.stateService.getDetailState(id).subscribe((res) => {
      if (res && res.data) {
        this.iData = res.data;
        const data = [];
        _.each(res.data.stateUsers, (x) => {
          data.push(x.user);
        });
        this.lstUser = data;
      }
    });
  }
}
