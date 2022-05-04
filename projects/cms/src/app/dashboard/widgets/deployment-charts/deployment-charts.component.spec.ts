import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentChartsComponent } from './deployment-charts.component';

describe('DeploymentChartsComponent', () => {
  let component: DeploymentChartsComponent;
  let fixture: ComponentFixture<DeploymentChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeploymentChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
