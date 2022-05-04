import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsActiveComponent } from './logs-active.component';

describe('LogsActiveComponent', () => {
  let component: LogsActiveComponent;
  let fixture: ComponentFixture<LogsActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
