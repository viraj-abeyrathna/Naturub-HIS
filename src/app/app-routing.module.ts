import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ComputerComponent } from './pages/inventory/computer/computer.component';

import { LoginComponent } from "./pages/user/login/login.component";

// const routes: Routes = [
//   // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
//   // {path: 'dashboard', component: DashboardComponent}

//   {path: '', redirectTo: 'login', pathMatch: 'full'},
//   {path: 'login', component: LoginComponent}
// ];

const routes: Routes=[
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'inventory/computer', component: ComputerComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// export const routingComponents = [DashboardComponent] 
