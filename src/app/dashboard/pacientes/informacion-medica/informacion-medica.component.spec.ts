import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionMedicaComponent } from './informacion-medica.component';

describe('InformacionMedicaComponent', () => {
  let component: InformacionMedicaComponent;
  let fixture: ComponentFixture<InformacionMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionMedicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacionMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
