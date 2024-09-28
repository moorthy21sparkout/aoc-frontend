import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { ApiService } from '../../../services/api.service';
import {  RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-initiative',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent,RouterModule,CommonModule],
  templateUrl: './initiative.component.html',
  styleUrl: './initiative.component.css'
})
export class InitiativeComponent implements OnInit{
constructor(
  private apiService:ApiService,
  private toastr: ToastrService
){}

initiativeList: any = [];
deleteInitiativeId: string|null = null;
isDeleteModalOpen = false;

ngOnInit()  {
  this.initiativeList = this.apiService.getInitiativeList().subscribe((response) => {
    this.initiativeList = response;
  });
}

  /**
   * Opens the delete confirmation modal.
   * @param id the id of the initiative to delete.
   * @param event the DOM event that triggered the call to this function.
   */
public openDeleteModal(id:string,event:Event){
  event.preventDefault();
  this.deleteInitiativeId = id;
  this.isDeleteModalOpen = true;
}


  /**
   * Closes the delete confirmation modal.
   */
public closeDeleteModal(){
  this.isDeleteModalOpen = false;
  this.deleteInitiativeId = null;
}

  /**
   * Confirms the deletion of an initiative, 
   */
public conformDelete(){
  if (!this.deleteInitiativeId) {
    return;
  }
  this.deleteInitiative(this.deleteInitiativeId);
  this.closeDeleteModal();
}


  /**
   * Delete an initiative and refresh the initiative list
   * @param deleteInitiative the id of the initiative to delete
   */
public deleteInitiative(deleteInitiative: string): void {  
  this.apiService.deleteInitiative(deleteInitiative).subscribe(
    (response) => {
      this.apiService.getInitiativeList();
    },
    (error) => {  
      this.toastr.error('Error deleting initiative');
    }
  );
}


}
