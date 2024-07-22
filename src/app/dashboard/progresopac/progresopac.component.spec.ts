import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresopacComponent } from './progresopac.component';

describe('ProgresopacComponent', () => {
  let component: ProgresopacComponent;
  let fixture: ComponentFixture<ProgresopacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgresopacComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgresopacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
