import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from '../../environments/environment';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import * as wagmiConfig from './wagmi.config';

import { ApiService } from '../services/api.service';
import { watchAccount } from '@wagmi/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HeaderComponent implements OnInit{


  constructor( private apiService: ApiService,private router: Router){}
  ngOnInit() {
     this.wagmiConfiguration();
     this.setupAccountWatcher();
  }

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
  private setupAccountWatcher() {
    watchAccount( async(account) => {
      console.log("the account is", account.address);
      if(account.address){
        try{
          await this.apiService.sendAccountAddress(account.address);
          console.log("connectd");
          this.router.navigate(['/initiative']); 
        }catch(err){
          console.log("not connect",err);
        }
      }else{
        this.router.navigate(['/verify']);
      }
    });
  }
}
