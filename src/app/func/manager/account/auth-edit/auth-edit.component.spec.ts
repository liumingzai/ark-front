import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEditComponent } from './auth-edit.component';

describe('ApiRecordComponent', () => {
  let component: AuthEditComponent;
  let fixture: ComponentFixture<AuthEditComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AuthEditComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
