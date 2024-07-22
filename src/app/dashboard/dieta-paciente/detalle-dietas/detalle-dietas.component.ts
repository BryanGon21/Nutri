import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PlanDietaService } from '@core/service/plandieta.service';

@Component({
  selector: 'app-detalle-dietas',
  // standalone: true,
  // imports: [],
  templateUrl: './detalle-dietas.component.html',
  styleUrl: './detalle-dietas.component.scss'
})
export class DetalleDietasComponent implements OnInit {
  id: any;
  planes: any;
  dietas: any;

  displayedDietColumns: string[] = [
    'comida', 
    'nombre', 
    'calorias', 
    'proteinas', 
    'carbohidratos', 
    'grasas', 
    'ingredientes', 
    'instrucciones'
  ];
  paginado!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private dietasService: PlanDietaService,
    private route: ActivatedRoute,
    // private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.id = data.get('id');
    });
    
    this.getList();
    
  }
  
  getList() {
    this.dietasService.getById(this.id).subscribe(data=>{
      this.planes = data;
      this.dietas = data.dietas;
      console.log(this.planes,'Listado');
      console.log(this.dietas);
      
      this.paginado = new MatTableDataSource<any>(this.dietas);
      this.paginado.paginator = this.paginator;
    })
  }
}
