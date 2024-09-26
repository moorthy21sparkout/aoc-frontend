import { Component, OnInit , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class NavbarComponent implements OnInit{

  accountAddress:Signal<string | null>;
  isOperationComplete = true;

  constructor(private apiService:ApiService,private router:Router){
    this.accountAddress = this.apiService.accountAddress;
  }
  ngOnInit() {
    // console.log("tha",this.getFormattedAddress()); 
    // this.getFormattedAddress();
  }
  getFormattedAddress(): string {
    return this.apiService.getFormattedAddress(); // Delegate to ApiService
  }
  onDisconnect(){

  }
  // getFormattedAddress(): string {
  //   const address = this.accountAddress();
  //   console.log("address",address);
  //   const wagmiStore = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
  //   console.log("wagmi",wagmiStore);

  //   const account = wagmiStore.state?.data?.account;
  //   console.log("Wagmi Store Account:", account);

  //   if (account === address) {
  //     console.log("Current account:", address);
  //     return `${account.slice(0, 5)}...${account.slice(-4)}`; // Show first 5 and last 4 characters
  //   }
    
  //   return 'Not connected'; // Default text if address is null or doesn't match
  // }
}
// const wagmiStore = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
// if (wagmiStore.state?.data?.account === account.address) {
//   observer.next();
//   observer.complete();
// }            