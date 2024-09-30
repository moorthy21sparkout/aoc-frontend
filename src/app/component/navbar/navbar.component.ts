import { Component, OnInit , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WagmiService } from '../../services/wagmi/wagmi.service';
import { watchAccount } from '@wagmi/core';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class NavbarComponent implements OnInit{

  constructor(private apiService:ApiService,private router:Router,private wagmiService:WagmiService,
    private toastr: ToastrService
   
  ) {
  }
  ngOnInit() {
    this.wagmiService.wagmiConfiguration();
    this.wagmiService.setupAccountWatcher();
  }
 
}
           