import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";

@Component({
    selector: 'app-web-layout',
    standalone: true,
    templateUrl: './web-layout.component.html',
    styleUrl: './web-layout.component.scss',
    imports: [RouterOutlet, HeaderComponent]
})
export class WebLayoutComponent {

}
