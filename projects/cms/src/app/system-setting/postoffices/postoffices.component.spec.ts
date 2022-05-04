import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostofficesComponent } from './postoffices.component';

describe('PostofficesComponent', () => {
  let component: PostofficesComponent;
  let fixture: ComponentFixture<PostofficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostofficesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostofficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
