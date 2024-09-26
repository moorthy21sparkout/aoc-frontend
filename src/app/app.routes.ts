import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { authGuard } from './auth/auth.guard';
import { SettingComponent } from './component/setting/setting.component';
import { InitiativeComponent } from './component/initiative/initiative.component';

export const routes: Routes = [
   
    // {path:'dashboard', component:DashboardComponent  },
    // {path:'setting',component:SettingComponent},
    // {path:'initiative',component:InitiativeComponent}
    {path:'verify',component:HeaderComponent },
    {
        path: 'initiative',
        component: DashboardComponent,
        children: [
            { path: '', component: InitiativeComponent },
            { path: 'setting', component: SettingComponent } 
        ]
      },
      { path: '', redirectTo: '/verify', pathMatch: 'full' },
      { path: '**', redirectTo: '/verify' , pathMatch: 'full' }
    // ,canActivate: [authGuard]
];
