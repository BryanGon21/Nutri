import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDietasComponent } from './detalle-dietas.component';

describe('DetalleDietasComponent', () => {
  let component: DetalleDietasComponent;
  let fixture: ComponentFixture<DetalleDietasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleDietasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleDietasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
