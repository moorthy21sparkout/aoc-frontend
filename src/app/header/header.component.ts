import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ApiService } from '../services/api.service';
import { watchAccount } from '@wagmi/core';
import { Router } from '@angular/router';
import { WagmiService } from '../services/wagmi/wagmi.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HeaderComponent implements OnInit{


  constructor(
    private apiService: ApiService,
    private router: Router,
    private wagmiService:WagmiService,
    private toastr: ToastrService
  ){}
  ngOnInit() {
    this.wagmiService.wagmiConfiguration();
     this.wagmiService.setupAccountWatcher();
     
  }


}
