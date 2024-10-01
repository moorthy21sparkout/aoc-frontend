import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import {  RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Initiative } from '../../../interfaces/initiative.interface';
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
perPage: number = 5;
totalDocs:any='';
hasNextPage: boolean = false;
hasPrevPage: boolean = false;
nextPage: number|null = null;
prevPage: number|null = null;
deleteInitiativeId = '';
isDeleteModalOpen = false;

ngOnInit()  {
  this.listInitiatives(this.page, this.perPage);
  this.fetchInitiatives(this.page);
}

fetchInitiatives(page:number) {
  this.initiveService.getInitiativeList(this.page, this.perPage).subscribe(response => {

    this.initiativeList = response.data.docs;
    this.totalDocs = response.data.totalDocs;
    this.total = Math.ceil(this.totalDocs / this.perPage);
  });
}

/**
 * @param {number} page - The page number to navigate to.
 * @return {void} This function does not return a value.
 */
goToPage(page: number) {
  if (page >= 1 && page <= this.total) {
    this.page = page;
    this.fetchInitiatives(page);
  }
}

/**
 * @return {void} This function does not return a value.
 */
nextPages() {
  if (this.page < this.total) {
    this.page++;
    this.fetchInitiatives(this.page);
  }
}


/**
 * @return {void} This function does not return a value.
 */
previousPage() {
  if (this.page > 1) {
    this.page--;
    this.fetchInitiatives(this.page);
  }
}

/**
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The number of initiatives to return per page.
 */
listInitiatives(page: number, limit: number) {
  this.initiveService.getInitiativeList(page, limit).subscribe((response) => {
    this.initiativeList = response?.data?.docs;
    this.total = response.total;
  });
}

  /**
   * @param id the id of the initiative to delete.
   * @param event the DOM event that triggered the call to this function.
   */
public openDeleteModal(id: string) {
  this.deleteInitiativeId = id;
  this.isDeleteModalOpen = true;
}


  /**
   * Closes the delete confirmation modal.
   */
public closeDeleteModal(){
  this.isDeleteModalOpen = false;
}

  /**
   * Confirms the deletion of an initiative,
   */
public confirmDelete(){
  this.deleteInitiative(this.deleteInitiativeId);
  this.closeDeleteModal();
}


  /**
   * Delete an initiative and refresh the initiative list
   * @param deleteInitiative the id of the initiative to delete
   */
public deleteInitiative(id: any) {
  this.initiveService.deleteInitiative(id).subscribe(
    (response) => {
      this.toastr.success('Initiative deleted successfully');
      this.listInitiatives(this.page, this.perPage);
      this.fetchInitiatives(this.page);

      },
    (error) => {
      this.toastr.error('Error deleting initiative');
    });
    }
}
