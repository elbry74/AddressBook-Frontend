import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { JobDialogComponent } from './components/job-dialog/job-dialog.component';

const routes: Routes = [
  {path:'',redirectTo:'login' , pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'AddEntry',component:AddEntryComponent},
  {path:'JobDialog',component:JobDialogComponent},
  {path:'home',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
