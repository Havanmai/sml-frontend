import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployInstallRepairComponent } from './deploy-install-repair.component';

describe('DeployInstallRepairComponent', () => {
  let component: DeployInstallRepairComponent;
  let fixture: ComponentFixture<DeployInstallRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeployInstallRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployInstallRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
