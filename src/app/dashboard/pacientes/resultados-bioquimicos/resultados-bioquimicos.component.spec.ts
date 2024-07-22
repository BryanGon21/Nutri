import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosBioquimicosComponent } from './resultados-bioquimicos.component';

describe('ResultadosBioquimicosComponent', () => {
  let component: ResultadosBioquimicosComponent;
  let fixture: ComponentFixture<ResultadosBioquimicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosBioquimicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultadosBioquimicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
