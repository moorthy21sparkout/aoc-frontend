import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-initiative-action',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './initiative-action.component.html',
  styleUrl: './initiative-action.component.css'
})
export class InitiativeActionComponent implements OnInit{

  initiative  = {
    id:'',
    name:'',
    start: '',
    end: '',
    identifier: ''
  };

  isEdit: boolean = false;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private apiService:ApiService,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.getInitiativeDetails(params['id']);
      } else {
        this.isEdit = false;
      }
    });
  }
  /**
   * @param id The id of the initiative to fetch.
   */
  getInitiativeDetails(id: string) {
    this.apiService.getInitiativeById(id).subscribe((data) => {

    },
    (error) => {
        this.toastr.error('Error getting initiative details');
      }
  );
  }
  /** 
   * @param initiativeForm The form that was submitted.
   */

  onSubmit(initiativeForm: NgForm): void {
    if (initiativeForm.valid) {
      if (this.isEdit) {
        this.apiService.updateInitiative(this.initiative.id, this.initiative).subscribe(
          (data) => {
            this.router.navigate(['/initiative']);
            this.toastr.success('Initiative updated successfully')
          },
          (error) => {
            this.toastr.error('Error updating initiative');
          }
        )
      } else {
        this.toastr.success("Successful Connected");
      }
      this.router.navigate(['/initiative']);
    }
  }
}
