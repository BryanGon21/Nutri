import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '@core/service/user.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        RouterLink,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
})
export class SignupComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  error = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      genero: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      ocupacion: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['',[Validators.required, Validators.email, Validators.minLength(5)],],
      residencia: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
  this.error = '';
  if (this.authForm.invalid) {
    this.error = 'Error !';

    return;
  } else {
    this.userService.registrarUsuario(this.authForm.value).subscribe(
      (data) => {
        console.log(data);
        this.submitted = true;
        this.router.navigate(['/authentication/signin']);
      },
      (error) => {
        console.log(error);
      }
    );
    }
  }
}
