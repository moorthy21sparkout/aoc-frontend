import { Injectable } from '@angular/core';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import * as wagmiConfig from './wagmi.config';
import { environment } from '../../../environments/environment';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { watchAccount } from '@wagmi/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WagmiService {
  private hasShownDisconnectToast = false;
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
  return new Observable(observer => {
    watchAccount((account) => {
      if (account.address) {
        this.apiService.sendAccountAddress(account.address).subscribe({
          next: (response) => {
            localStorage.setItem('session_token', response.data.session.session_token);
            this.hasShownDisconnectToast = false; // Reset flag on successful connection
            observer.next({ success: true});
          },
          error: (err) => {
            this.toastr.error("Failed to connect to wallet");
            observer.error(err);
          }
        });
      } else {
        if (!this.hasShownDisconnectToast) {
          this.apiService.logoutAccountAddress().subscribe((res)=>{
            localStorage.removeItem('session_token');
            console.log("logoutAccountAddress",res);
          });
          this.toastr.error("Wallet disconnected");
          this.hasShownDisconnectToast = true; // Set flag to prevent multiple toasts
        }
        observer.next({ success: false });
      }
    });
  });
}


}
