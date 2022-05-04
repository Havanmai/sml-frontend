import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPostofficeComponent } from './top-postoffice.component';

describe('TopPostofficeComponent', () => {
  let component: TopPostofficeComponent;
  let fixture: ComponentFixture<TopPostofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPostofficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPostofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
