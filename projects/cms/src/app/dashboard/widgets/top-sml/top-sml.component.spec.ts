import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSmlComponent } from './top-sml.component';

describe('TopSmlComponent', () => {
  let component: TopSmlComponent;
  let fixture: ComponentFixture<TopSmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
