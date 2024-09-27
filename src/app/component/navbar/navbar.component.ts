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
    this.setupAccountWatcher();
  }
  public setupAccountWatcher() {
    watchAccount( async(account) => {
      if (account.address) {
        try {
          this.apiService.sendAccountAddress(account.address).subscribe({
            next: (response) => {
              console.log("Connected:", response);
              this.router.navigate(['/initiative']); 
            },
            error: (err) => {
              console.error("Failed to connect:", err);
            }
          });
        } catch (err) {
          console.error("Unexpected error occurred", err);
        }
      } else {
        this.toastr.error("Wallet dissconnected ");
        this.router.navigate(['/']);
      }
    });
 }
}
           