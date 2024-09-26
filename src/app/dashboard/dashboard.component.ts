import { Component } from '@angular/core';
import { SidebarComponent } from "../component/sidebar/sidebar.component";
import { NavbarComponent } from "../component/navbar/navbar.component";
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { SettingComponent } from '../component/setting/setting.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, HeaderComponent, RouterOutlet, SettingComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
