import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProgresosComponent } from './lista-progresos.component';

describe('ListaProgresosComponent', () => {
  let component: ListaProgresosComponent;
  let fixture: ComponentFixture<ListaProgresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProgresosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaProgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
