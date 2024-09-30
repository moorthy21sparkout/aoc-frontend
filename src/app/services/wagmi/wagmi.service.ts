import { Injectable } from '@angular/core';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import * as wagmiConfig from './wagmi.config';
import { environment } from '../../../environments/environment';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { watchAccount } from '@wagmi/core';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class WagmiService {

  constructor(private apiService:ApiService,private router:Router,private toastr: ToastrService
  ) { }

  public wagmiConfiguration() {
    const projectId = environment.WALLET_CONNECT_PROJECT_ID;
    const modal = createWeb3Modal({
      wagmiConfig: defaultWagmiConfig(wagmiConfig.config.metaData),
      projectId,
      themeMode: 'dark',
      enableAnalytics: wagmiConfig.config.enableAnalytics, 
      themeVariables: wagmiConfig.config.themeVariables
    })
  }
  public setupAccountWatcher() {
    watchAccount( async(account) => {
      if (account.address) {
        try {
          this.apiService.sendAccountAddress(account.address).subscribe({
            next: (response) => {
              localStorage.setItem('session_token',response.data.session.session_token);
              console.log("response",response);
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