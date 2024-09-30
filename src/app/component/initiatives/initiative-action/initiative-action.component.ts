import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { InitiativeService } from '../../../services/initiative.service';

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
    initiative:'',
    start_period: '',
    end_period: '',
    identifier: ''
  };

  isEdit: boolean = false;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private initiativeService:InitiativeService,
    private apiService:ApiService
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
    this.initiativeService.getInitiativeById(id).subscribe((data) => {

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
        alert(3);
        this.initiativeService.updateInitiative(this.initiative.id, this.initiative).subscribe(
          (data) => {
            this.router.navigate(['/initiative']);
            this.toastr.success('Initiative updated successfully')
          },
          (error) => {
            this.toastr.error('Error updating initiative');
          }
        )
      } else {
        const { id, ...initiativeWithoutId } = this.initiative;
        const wallet_address = this.apiService.accountAddress();

        const initiativeWithAddress = {
            ...initiativeWithoutId,
            wallet_address
        };
        console.log("initiativeWithAddrss",initiativeWithAddress);
        this.initiativeService.createInitiative(initiativeWithAddress).subscribe(
          (data) => {
            this.toastr.success('Initiative created successfully');
            this.router.navigate(['/initiative']);
          },
          (error) => {
            this.toastr.error('Error creating initiative');
          }
        )
      }
      this.router.navigate(['/initiative']);
    }
  }
}
