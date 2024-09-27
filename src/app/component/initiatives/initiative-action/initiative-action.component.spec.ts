import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeActionComponent } from './initiative-action.component';

describe('InitiativeActionComponent', () => {
  let component: InitiativeActionComponent;
  let fixture: ComponentFixture<InitiativeActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiativeActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiativeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
