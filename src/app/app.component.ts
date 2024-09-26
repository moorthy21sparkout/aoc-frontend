import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { NavbarComponent } from "./component/navbar/navbar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SidebarComponent } from './component/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavbarComponent, SidebarComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aoc-frontend';
}
