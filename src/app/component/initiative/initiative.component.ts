import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-initiative',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './initiative.component.html',
  styleUrl: './initiative.component.css'
})
export class InitiativeComponent {

}
