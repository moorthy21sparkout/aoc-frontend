import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import {  RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Initiative, PaginatedResponse } from '../../../interfaces/initiative.interface';
import { InitiativeService } from '../../../services/initiative.service';


@Component({
  selector: 'app-initiative',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent,RouterModule,CommonModule],
  templateUrl: './initiative.component.html',
  styleUrl: './initiative.component.css'
})
export class InitiativeComponent implements OnInit{
constructor(
  private toastr: ToastrService,
  private initiveService:InitiativeService
){}

initiativeList: Initiative[] = [
];
total: number = 0;
page: number = 1;
perPage: number = 10;
deleteInitiativeId: string|null = null;
isDeleteModalOpen = false;

ngOnInit()  {
    this.initiveService.getInitiativeList().subscribe((response:Initiative[]) => {
    this.initiativeList = response;
  });
}

/**
 * @return {void} This function does not return anything.
 */
public loadInitiavites(): void {
  this.initiveService.getInitiativesPageList(this.page, this.perPage).subscribe((response:PaginatedResponse) => {
    this.initiativeList = response.data;
    this.total = response.total;
  },
  (error) => {
    this.toastr.error('Error loading initiatives',error);
  });
}
  /**
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
  this.initiveService.deleteInitiative(deleteInitiative).subscribe(
    (response) => {
      this.initiveService.getInitiativeList();
    },
    (error) => {
      this.toastr.error('Error deleting initiative');
    }
  );
}


}
