import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewEditComponent } from './overview-edit.component';

describe('OverviewEditComponent', () => {
  let component: OverviewEditComponent;
  let fixture: ComponentFixture<OverviewEditComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [OverviewEditComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
