import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { ApiService } from '../../../services/api.service';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-initiative',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent,RouterModule],
  templateUrl: './initiative.component.html',
  styleUrl: './initiative.component.css'
})
export class InitiativeComponent implements OnInit{
constructor(private apiService:ApiService){}

initiativeList: any = [];
ngOnInit()  {
  this.initiativeList = this.apiService.getInitiativeList().subscribe((response) => {
    this.initiativeList = response;
    console.log("value initiative",this.initiativeList);
  });
}


}
