import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanDietaService } from '@core/service/plandieta.service';

@Component({
  selector: 'app-listar-dietas',
  templateUrl: './listar-dietas.component.html',
  styleUrls: ['./listar-dietas.component.css']
})
export class ListarDietasComponent implements OnInit {
  id: any;
  dietas : any;

  nombreColumna: string[]=[
    'Nº',
    'Medico',
    'Nombre',
    'Dias',
    'Acciones'
  ];
  paginado!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private dietasService: PlanDietaService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.id = data.get('id');
    });
    this.getList();
  }

  getList() {
    if (this.id) {
      this.dietasService.getAll({ code: this.id }).subscribe(data=>{
        this.dietas = data;
        console.log(this.dietas,'Listado');
        
        this.paginado = new MatTableDataSource<any>(data);
        this.paginado.paginator = this.paginator;
      })
    } else {
      this.dietasService.getAll().subscribe(data=>{
        this.dietas = data;
        console.log(this.dietas,'Listado');
        
        this.paginado = new MatTableDataSource<any>(data);
        this.paginado.paginator = this.paginator;
      })
    }
  }

  verDieta(id:any){
    this.router.navigate(['/dashboard/dietas/plan',id]);
  }

}
