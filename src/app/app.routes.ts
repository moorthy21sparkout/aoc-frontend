import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SettingComponent } from './component/setting/setting.component';
import { InitiativeComponent } from './component/initiatives/initiative/initiative.component';
import { InitiativeActionComponent } from './component/initiatives/initiative-action/initiative-action.component';

export const routes: Routes = [
    {path:'',component:HeaderComponent},
    {
        path: 'initiative',
        component: DashboardComponent,
        children: [
            { path: '', component: InitiativeComponent },
            { path: 'setting', component: SettingComponent } ,
            {path:'add',component:InitiativeActionComponent},
            { path: 'edit', component: InitiativeActionComponent },
        ]
      },
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '**', redirectTo: '/' , pathMatch: 'full' }
];
