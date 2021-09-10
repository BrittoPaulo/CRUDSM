import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './users/create/create.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'users', 
    pathMatch: 'full'
  },
  { 
    path: 'users', 
    component: UsersComponent
   },
   { 
    path: 'users/create', 
    component: CreateComponent
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
